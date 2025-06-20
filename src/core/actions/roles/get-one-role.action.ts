import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { OneRoleResponse } from "../../../infrastructure/interfaces/one-role.response";
import { personsApi } from "../../api/persons.api";

export const getOneRoleAction = async (roleId: string)
    : Promise<ApiResponse<OneRoleResponse>> => {
    try {

        // Accion que permite extraer del backend el pais por el id
        const { data } = await personsApi.get<ApiResponse<OneRoleResponse>>(`/roles/${roleId}`)

        return data;

    } catch (error) {
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