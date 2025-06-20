import { Link, useParams } from "react-router"
import { useCountries } from "../../hooks/useCountries";
import { FormikProvider, useFormik } from "formik";
import { countryInitialValues, countryValidationSchema } from "../../../infrastructure/validations/country.validation";
import { Loader } from "../../components/shared/Loader";
import { useEffect } from "react";
import { Title } from "../../components/shared/Title";

export const EditCountryPage = () => {

    const { countryId } = useParams();

    const { oneCountryQuery, editCountryMutation } = useCountries(countryId);

    //-----Formik-----
    const formik = useFormik({
        initialValues: countryInitialValues,
        validationSchema: countryValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (formValues) => {
            // console.log(formValues);
            editCountryMutation.mutate(formValues)
        }
    })

    useEffect(() => {
        if (oneCountryQuery.isFetched && oneCountryQuery.data?.data) {
            const { name, alphaCode3 } = oneCountryQuery.data.data;

            formik.setValues({
                name: name,
                alphaCode3: alphaCode3
            });
        }
    }, [oneCountryQuery.isFetched, oneCountryQuery.data]);
    
    if (oneCountryQuery.isLoading) {
        return <Loader />
    }

    return (
        <div className="w-full flex flex-col">
            <Title text="Crear Pais" />
            {editCountryMutation.isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <span>{editCountryMutation.error.message}</span>
                </div>
            )}

            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="mt-8 w-full">

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="shadow appearance-none rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-xs mt-1">
                                    {formik.errors.name}
                                </div>
                            )
                        }
                    </div>
                    {/* Parte del alphaCode3 */}
                    <div className="mb-4">
                        <label htmlFor="alphaCode3" className="block text-gray-700 text-sm font-bold">
                            Código Alfa 3
                        </label>
                        <input
                            type="text"
                            id="alphaCode3"
                            name="alphaCode3"
                            className="shadow appearance-none rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow"
                            value={formik.values.alphaCode3}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.touched.alphaCode3 && formik.errors.alphaCode3 && (
                                <div className="text-red-500 text-xs mt-1">
                                    {formik.errors.alphaCode3}
                                </div>
                            )
                        }
                    </div>

                    <div className="flex items-center content-center justify-center gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Guardar
                        </button>
                        <Link to="/countries" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none">
                            Regresar
                        </Link>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}
