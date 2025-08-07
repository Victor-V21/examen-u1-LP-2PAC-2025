import { Navigate, Route, Routes } from "react-router"
import { Navbar } from "../presentation/components/layout/Navbar"
import { HomePage } from "../presentation/pages/home/HomePage"

import { CountriesPage } from "../presentation/pages/countries/CountriesPage"
import { PersonsPage } from "../presentation/pages/persons/PersonsPage"
import { CreateCountryPage } from "../presentation/pages/countries/CreateCountryPage"
import { EditCountryPage } from "../presentation/pages/countries/EditCountryPage"
import { DeleteCountryPage } from "../presentation/pages/countries/DeleteCountryPage"

import { RolesPage } from "../presentation/pages/roles/RolesPage"
import { EditRolePage } from "../presentation/pages/roles/EditRolePage"
import { CreateRolePage } from "../presentation/pages/roles/CreateRolePage"
import { DeleteRolePage } from "../presentation/pages/roles/DeleteRolePage"
import { LoginPage } from "../presentation/pages/security/auth/LoginPage"
import { PrivateRoute } from "../presentation/components/shared/PrivateRoute"
import { useAuthStore } from "../presentation/stores/authStore"
import { RoleProtectedRoute } from "../presentation/components/shared/RoleProtectedRoute"
import { Role } from "../infrastructure/enums/role.enum"

export const AppRouter = () => {

    const { authenticated } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <Routes>
                
                <Route element={<PrivateRoute />}>
                    
                    <Route path="/" element={<HomePage />} />

                    <Route element={<RoleProtectedRoute requiredRoles={[Role.SYS_ADMIN_EDITADO]} />}>
                        <Route path="/countries" element={<CountriesPage />} />
                        <Route path="/countries/create" element={<CreateCountryPage />} />
                        <Route path="/countries/:countryId/edit" element={<EditCountryPage />} />
                        <Route path="/countries/:countryId/delete" element={<DeleteCountryPage />} />
                        
                    </Route>
                    <Route path="/persons" element={<PersonsPage />} />

                    {/* Parte del examen */}
                    <Route path="/roles" element={<RolesPage />} />
                    <Route path="/roles/create" element={<CreateRolePage />} />
                    <Route path="/roles/:roleId/edit" element={<EditRolePage />} />
                    <Route path="/roles/:roleId/delete" element={<DeleteRolePage />} />
                </Route>
                <Route path="/auth/login" element={authenticated ? <Navigate to="/" replace /> : <LoginPage />} />
            </Routes>
            
        </div >
    )
}

