import { AxiosError } from "axios";
import { ApiResponse } from "../../../../infrastructure/interfaces/api.response";
import { LoginResponse } from "../../../../infrastructure/interfaces/login.response";
import { ApiErrorResponse } from "../../../../infrastructure/interfaces/api-error.response";
import { authPersonsApi } from "../../../api/auth.persons.api";
import { RefreshTokenResponse } from "../../../../infrastructure/interfaces/refresh-token.response";
import { RefreshTokenModel } from "../../../models/refresh-token.model";

export const refreshTokenAction = async (refreshTokenModel: RefreshTokenModel): Promise<ApiResponse<RefreshTokenResponse>> => {
    try {
        const { data } = await authPersonsApi.post<ApiResponse<LoginResponse>>(
            '/auth/refresh-token',
            refreshTokenModel
        );

        return data;
        
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if(apiError.response) {
            //throw new Error(apiError.response.data.message);

            return {
                status: false,
                message: apiError.response.data.message || 'Fallo la actualización del Token',
            }
             
        } else if (apiError.request) {
            //throw new Error('Error de conexión');
            return {
                status: false,
                message: 'Error de conexión',
            }
        } else {
            //throw new Error('Error desconocido')
            return {
                status: false,
                message: 'Error desconocido',
            }
        }
    }
} 