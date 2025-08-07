import { AxiosError } from "axios";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { OneCountryResponse } from "../../../infrastructure/interfaces/one-country.response";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";

export const getOneCountryAction = async (countryId: string)
    : Promise<ApiResponse<OneCountryResponse>> => {
    try {

        // Accion que permite extraer del backend el pais por el id
        const { data } = await personsApi.get<ApiResponse<OneCountryResponse>>(`/countries/${countryId}`)

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