import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPager } from "../pages"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginPage/> } />
        <Route path="register" element={ <RegisterPager/> } />
        
        <Route path="/*" element={ <Navigate to="/auth/login"/> } />
    </Routes>
  )
}
