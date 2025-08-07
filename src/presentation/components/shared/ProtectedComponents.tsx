import { Role } from "../../../infrastructure/enums/role.enum";
import { useAuthStore } from "../../stores/authStore";


interface Props {
    requiredRoles: Role[];
    children: React.ReactNode;
}
export const ProtectedComponents = ({requiredRoles, children}: Props) => {
    const {roles} = useAuthStore();
    const hasRequiredRoles = requiredRoles.some(role => roles?.includes(role));

    if(!hasRequiredRoles){
        return null
    }

  return (
    <>{children}</>
  )
}
