import { RoleModel } from "../../core/models/role.model";
import * as Yup from 'yup'

export const roleInitialValues: RoleModel = {
    name: "",
    description: ""
};

export const roleValidationSchema: Yup.ObjectSchema<RoleModel> = 
    Yup.object({
        name: Yup.string()
            .required("El nombre es requerido")
            .min(3, "El nombre de tener al menos 3 caracteres")
            .max(50, "EL nombre no puede tener mas de 50 caracteres"),
        description: Yup.string()
            .required("La descripción es necesaria")
            .max(256, "EL nombre no puede tener mas de 100 caracteres")
    });