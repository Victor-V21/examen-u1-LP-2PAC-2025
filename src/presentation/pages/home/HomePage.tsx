import { Globe, Users } from "lucide-react"
import { Title } from "../../components/shared/Title"
import { DashboardCard } from "../../components/home/DashboardCard"
import { Loader } from "../../components/shared/Loader"
import { useStatistics } from "../../hooks/useStatistics"

export const HomePage = () => {

  const { data, isLoading } = useStatistics();

  if(isLoading) {
    return <Loader />
  }

  console.log(data);
  

  return (
    <div>
      <Title text="Página de Inicio" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          title="Países"
          to="/countries/create"
          countValue={data?.data?.countriesCount || 0}
          icon={<Globe size={48} />}
        />

        <DashboardCard
          title="Personas"
          to="/persons/create"
          countValue={data?.data?.personsCount || 0}
          icon={<Users size={48} />}
        />

      </div>
    </div>
  )
}
