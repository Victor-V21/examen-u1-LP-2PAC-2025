import { Link, useParams } from "react-router"
import { Title } from "../../components/shared/Title"
import { useCountries } from "../../hooks/useCountries";
import { Loader } from "lucide-react";

export const DeleteCountryPage = () => {

    const { countryId } = useParams();
    const { oneCountryQuery, deleteCountryMutation } = useCountries(countryId);

    console.log(countryId);

    if (oneCountryQuery.isLoading) {
        return <Loader />
    }

    return (
        <div className="w-full flex flex-col">
            <Title text="Borra Pais" />
            {
                deleteCountryMutation.isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <span>{deleteCountryMutation.error.message}</span>
                    </div>
                )
            }
            <div className="mt-6 w-full text-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    ?Desea borrar el país: {oneCountryQuery.data?.data.name}?
                </label>
            </div>

            <div className="flex items-center content-center justify-center gap-2">
                <button
                onClick={() => deleteCountryMutation.mutate()}
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Confirmar
                </button>
                <Link to="/countries" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none">
                    Regresar
                </Link>
            </div>
        </div>
    )
}
