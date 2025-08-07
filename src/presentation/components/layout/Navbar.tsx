import { Globe, Home, LogOut, Menu, UserCheck2, Users } from "lucide-react";
import { NavLink } from "../shared/NavLink";
import { useState } from "react";
import { MobileNavLink } from "../shared/MobileNavLink";
import { Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { ProtectedComponents } from "../shared/ProtectedComponents";
import { Role } from "../../../infrastructure/enums/role.enum";

export const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {logout} = useAuthStore();

    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/'
        }

        return location.pathname.startsWith(path);
    }


    return (
        <>
            <nav className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo y titulo */}
                        <div className="flex items-center">
                            <span className="font-LexendDeca-Bold text-xl">
                                Gestión de Personas
                            </span>
                        </div>

                        {/* Navegación en escritorio */}
                        <div className="hidden md:flex">
                            <NavLink to="/" active={isActive("/")} text="Inicio" icon={<Home size={18} />} />
                            <ProtectedComponents requiredRoles={[Role.SYS_ADMIN_EDITADO]}>
                                 <NavLink to="/countries" active={isActive("/countries")} text="Países" icon={<Globe size={18} />} />
                            </ProtectedComponents>
                            <NavLink to="/persons" active={isActive("/persons")} text="Personas" icon={<Users size={18} />} />
                            <NavLink to="/roles" active={isActive("/roles")} text="Roles" icon={<UserCheck2 size={18} />} />
                            <button
                                onClick={logout}
                                type="button"
                                className="flex items-center hover:bg-blue-500 px-3 py-2"
                            >
                                <LogOut size={18}/>
                                <span className="m1-2">Salir</span>
                            </button>
                        </div>
                        {/* Botón de menu móvil */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="text-white hover:text-blue-200 focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>

                        </div>

                    </div>
                </div>

                {/* Menu móvil */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <MobileNavLink to="/" active={isActive("/")} icon={<Home size={18} />} text="Inicio" />
                            <ProtectedComponents requiredRoles={[Role.SYS_ADMIN_EDITADO]}>
                                <MobileNavLink to="/countries" active={isActive("/countries")} icon={<Globe size={18} />} text="Países" />
                            </ProtectedComponents>
                            <MobileNavLink to="/persons" active={isActive("/persons")} icon={<Users size={18} />} text="Personas" />
                            <MobileNavLink to="/roles" active={isActive("/roles")} text="Roles" icon={<UserCheck2 size={18} />} />
                            <button
                                onClick={logout}
                                type="button"
                                className="flex w-full rounded-md items-center hover:bg-blue-500 px-3 py-2 font-LexendDeca-Medium"
                            >
                                <LogOut size={18} className="mr-3"/>
                                <span>Salir</span>
                            </button>
                        </div>
                    </div>
                )}
                
            </nav>

            {/* Principal content */}
            {/* <div className="min-h-screen bg-gray-100 mx-auto p-4 mt-4">
                <Outlet />
            </div> */}
        </>
    );
}