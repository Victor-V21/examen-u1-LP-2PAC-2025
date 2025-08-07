import { AxiosError } from "axios";
import { ApiResponse } from "../../../../infrastructure/interfaces/api.response";
import { LoginResponse } from "../../../../infrastructure/interfaces/login.response";
import { LoginModel } from "../../../models/login.model";
import { ApiErrorResponse } from "../../../../infrastructure/interfaces/api-error.response";
import { authPersonsApi } from "../../../api/auth.persons.api";

export const loginAction = async (login: LoginModel): Promise<ApiResponse<LoginResponse>> => {
    try {
        const { data } = await authPersonsApi.post<ApiResponse<LoginResponse>>(
            '/auth/login',
            login
        );

        return data;
        
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if(apiError.response) {
            //throw new Error(apiError.response.data.message);

            return {
                status: false,
                message: apiError.response.data.message || 'Error desconocido',
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