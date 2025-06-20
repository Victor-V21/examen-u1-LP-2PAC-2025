// import { Regex } from "lucide-react";
import { CountryModel } from "../../core/models/country.model";
import * as Yup from 'yup'

export const countryInitialValues: CountryModel = {
    name: "",
    alphaCode3: ""
};

export const countryValidationSchema: Yup.ObjectSchema<CountryModel> = 
    Yup.object({
        name: Yup.string()
            .required("El nombre es requerido")
            .min(3, "El nombre de tener al menos 3 caracteres")
            .max(100, "EL nombre no puede tener mas de 100 caracteres"),
        alphaCode3: Yup.string()
            .required("Código alfanumérico es requerido")
            .length(3, "El código alfanumérico debe tener exactamente 3 caracteres")
            .matches(/^[A-Z]{3}/, "El código alfanumérico debe ser en mayúsculas")
    });