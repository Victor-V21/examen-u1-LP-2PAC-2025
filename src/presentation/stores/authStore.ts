import { create } from "zustand";
import { LoginModel } from "../../core/models/login.model";
import { loginAction } from "../../core/actions/security/auth/login.action";
import { Role } from "../../infrastructure/enums/role.enum";

export interface JwtPayLoad {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    jti: string;
    UserId: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": Role | Role[];
    exp: number;
    iss: string;
    aud: string;
}

interface AuthStore {
    token?: string;
    refreshToken?: string;
    email?: string;
    roles?: Role[];
    authenticated: boolean;
    errorMessage?: string;
    login: (login: LoginModel) => void;
    logout: () => void;
    setTokens: (token: string, refreshToken: string) => void;
}

const storedToken = localStorage.getItem('token') || undefined;
const storedEmail = localStorage.getItem('email') || undefined;
const storedPayload = getPayLoad(storedToken);
const storedRoles = getRolesFromPayload(storedPayload);
const storedRefreshToken = localStorage.getItem('refreshToken') || undefined;

export const useAuthStore = create<AuthStore>()((set) => ({
    token: storedToken,
    email: storedEmail,
    refreshToken: storedRefreshToken,
    roles: storedRoles,
    authenticated: isTokenValid(storedToken),
    errorMessage: undefined,

    login: async (login: LoginModel) => {
        const response = await loginAction(login);

        if (response.status && response.data) {
            // con los signos de interrogación se indican que no son null
            localStorage.setItem("token", response.data!.token);
            localStorage.setItem("email", response.data!.email);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            const payload = getPayLoad(response.data!.token);
            const roles = getRolesFromPayload(payload);

            set({
                token: response.data!.token,
                refreshToken: response.data.refreshToken,
                email: response.data!.email,
                authenticated: true,
                roles
            });

            return;
        }

        set({ errorMessage: response.message, authenticated: false });
    },
    setTokens: (token: string, refreshToken: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken)

        const payload = getPayLoad(token);
        const roles = getRolesFromPayload(payload);

        set({
            //token:token
            token,
            refreshToken,
            roles,
            authenticated: isTokenValid(token),
        })
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        set({ token: undefined, refreshToken: undefined, email: undefined, authenticated: false, errorMessage: undefined });
    }
}))

function isTokenValid(token?: string): boolean {
    const payload = getPayLoad(token);

    if (!payload || !payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);

    return payload.exp > now
}

function getRolesFromPayload(payload: JwtPayLoad | undefined): Role[] | undefined {
    if (!payload) return undefined;

    const claim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const roles = payload[claim];

    if (!roles) return undefined;
    if (Array.isArray(roles)) return roles as Role[];

    return [roles as Role];
}

function getPayLoad(token?: string): JwtPayLoad | undefined {
    if (!token) return undefined;

    try {
        return JSON.parse(atob(token?.split('.')[1])) as JwtPayLoad;
    } catch {
        return undefined;
    }
}