import * as Yup from "yup";

import { LoginModel } from "../../core/models/login.model";

export const loginInitialValues: LoginModel = {
    email: "",
    password: ""
}

export const loginValidationSchema: Yup.ObjectSchema<LoginModel> = Yup.object({
    email: Yup.string()
        .required("El email es requerido")
        .email("El email debe ser un correo electrónico válido"),

    password: Yup.string()
        .required("La contraseña es requerida")
})