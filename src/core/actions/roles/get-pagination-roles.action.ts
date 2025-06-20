
import { AxiosError } from "axios";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { PageResponse } from "../../../infrastructure/interfaces/page.response";
import { RolesResponse } from "../../../infrastructure/interfaces/roles.response";
import { personsApi } from "../../api/persons.api";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";

export const getPaginationRolesAction = async (page = 1, pageSize = 10, searchTerm = "")
    : Promise<ApiResponse<PageResponse<RolesResponse>>> => {
    try {
        const { data } = await personsApi
            .get<ApiResponse<PageResponse<RolesResponse>>>(`/roles`, {
                params: {
                    page,
                    pageSize,
                    searchTerm
                },
            });

        return data;
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if (apiError.response) {
            throw new Error(apiError.response.data.message);
        } else if (apiError.request) {
            throw new Error("Error de conexión")
        } else {
            throw new Error("Error desconocido.")
        }
    }
}

