import { AxiosError } from "axios";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { RolesResponse } from "../../../infrastructure/interfaces/roles.response";
import { personsApi } from "../../api/persons.api";
import { RoleModel } from "../../models/role.model";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";

export const createRoleAction = async (
    country : RoleModel
): Promise<ApiResponse<RolesResponse>> => {
    
    try
    {
        const{ data } = await personsApi.post<ApiResponse<RolesResponse>>
        (`/roles`,
            country);
        return data;

    }catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        if (apiError.response) {
            throw new Error(apiError.response.data.message);
        } else if (apiError.request) {
            throw new Error("Error de conexión")
        } else {
            throw new Error("Error desconocido.")
        }
    }
} 