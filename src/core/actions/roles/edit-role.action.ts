import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";
import { RolesResponse } from "../../../infrastructure/interfaces/roles.response";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { RoleModel } from "../../models/role.model";
import { personsApi } from "../../api/persons.api";

export const editRoleAction = async (
    role : RoleModel, rolesId: string
): Promise<ApiResponse<RolesResponse>> => {
    
    try
    {
        const{ data } = await personsApi.put<ApiResponse<RolesResponse>>
        (`/roles/${rolesId}`,
            role);
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