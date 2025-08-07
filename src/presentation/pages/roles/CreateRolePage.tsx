import { FormikProvider, useFormik } from "formik";
import { useRoles } from "../../hooks/useRoles";
import { roleInitialValues, roleValidationSchema } from "../../../infrastructure/validations/role.validation";
import { Title } from "../../components/shared/Title";
import { Link } from "react-router";

export const CreateRolePage = () => {

  const {createRoleMutation} = useRoles();

  //-----Formik-----
  const formik = useFormik({
    initialValues: roleInitialValues,
    validationSchema: roleValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (formValues) => {
     
      createRoleMutation.mutate(formValues)
    }
  })

  return (
    <div className="w-full flex flex-col">
      <Title text="Crear Rol"/>
      {createRoleMutation.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>{createRoleMutation.error.message}</span>
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
              formik.touched.name && formik.errors.name &&(
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </div>
              )
            }
          </div>
          {/* Parte de la descripcion */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold">
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="shadow appearance-none rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {
              formik.touched.description && formik.errors.description &&(
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
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
            <Link to="/roles" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none">
              Regresar
            </Link>
          </div>
        </form>
      </FormikProvider>
    </div>
  )
}
