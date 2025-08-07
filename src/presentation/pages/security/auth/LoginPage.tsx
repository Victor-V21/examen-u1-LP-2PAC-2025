
import { Title } from "../../../components/shared/Title"
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { useAuthStore } from "../../../stores/authStore";
import { loginInitialValues, loginValidationSchema } from "../../../../infrastructure/validations/login.validation";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// You need to import or define loginInitialValues and loginValidationSchema

export const LoginPage = () => {

    const { errorMessage, login, authenticated} = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (formValues) => {
            await login(formValues);
        }
    });

    useEffect(() => {
        if(authenticated)
        {
            navigate("/");
        }
    }, [authenticated]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Title text="Iniciar Sesión" />
                {typeof errorMessage === "string" && errorMessage.trim().length > 0 && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}

                <FormikProvider value={formik}>
                    <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-LexendDeca-Medium text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="w-full p-2 rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            <label htmlFor="password" className="block text-sm font-LexendDeca-Medium text-gray-700 mb-1 mt-4">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full p-2 rounded-md bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-LexendDeca-Medium py-2 transition-colors disabled:opacity-60 rounded-md"
                            disabled={formik.isSubmitting}
                        >
                            Iniciar Sesión
                        </button>
                        <hr className="border-gray-300"></hr>
                    </form>
                </FormikProvider>
            </div>
        </div>
    );
}
