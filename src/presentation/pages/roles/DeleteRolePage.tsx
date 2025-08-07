import { Loader } from "lucide-react";
import { Title } from "../../components/shared/Title";
import { Link, useParams } from "react-router";
import { useRoles } from "../../hooks/useRoles";

export const DeleteRolePage = () => {

    const { roleId } = useParams();
    const { oneRoleQuery, deleteRoleMutation } = useRoles(roleId);

    if (oneRoleQuery.isLoading) {
        return <Loader />
    }

    return (
        <div className="w-full flex flex-col">
            <Title text="Borra Rol" />
            {
                deleteRoleMutation.isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <span>{deleteRoleMutation.error.message}</span>
                    </div>
                )
            }
            <div className="mt-6 w-full text-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    ¿Desea borrar el rol? : {oneRoleQuery.data?.data.name}
                </label>
            </div>

            <div className="flex items-center content-center justify-center gap-2">
                <button
                onClick={() => deleteRoleMutation.mutate()}
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none">
                    Confirmar
                </button>
                <Link to="/roles" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none">
                    Regresar
                </Link>
            </div>
        </div>
    )
}
