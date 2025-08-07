import { Globe, UserCheck2, Users } from "lucide-react"
import { Title } from "../../components/shared/Title"
import { DashboardCard } from "../../components/home/DashboardCard"
import { Loader } from "../../components/shared/Loader"
import { useStatistics } from "../../hooks/useStatistics"
import { useRoles } from "../../hooks/useRoles"
import { Role } from "../../../infrastructure/enums/role.enum"

export const HomePage = () => {

  const { data, isLoading } = useStatistics();
   const { rolesPaginationQuery} = useRoles();
  
  if(isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Title text="Página de Inicio" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          title="Países"
          to="/countries/create"
          countValue={data?.data?.countriesCount || 0}
          icon={<Globe size={48} />}
          roles={[Role.SYS_ADMIN_EDITADO]}
        />

        <DashboardCard
          title="Personas"
          to="/persons/create"
          countValue={data?.data?.personsCount || 0}
          icon={<Users size={48} />}
          roles={[Role.SYS_ADMIN_EDITADO, Role.NORMAL_USER]}
        />

        <DashboardCard
          title="Roles"
          to="/roles/create"
          countValue={rolesPaginationQuery.data?.data?.totalItems || 0}
          icon={<UserCheck2 size={48} />}
          roles={[Role.SYS_ADMIN_EDITADO]}
        />
      </div>
    </div>
  )
}
