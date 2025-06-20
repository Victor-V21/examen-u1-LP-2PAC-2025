import { AxiosError } from "axios"
import { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { CountryResponse } from "../../../infrastructure/interfaces/country.response"
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response"
import { personsApi } from "../../api/persons.api"

export const deleteCountryAction = async (
    countryId : string
): Promise<ApiResponse<CountryResponse>> => {
    
    try
    {
        const{ data } = await personsApi.delete<ApiResponse<CountryResponse>>
        (`/countries/${countryId}`);
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