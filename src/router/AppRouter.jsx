import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/";


export const AppRouter = () => {
  const {status} = useSelector(state => state.auth);
  if(status === 'checking') {
    return <CheckingAuth/>
  }
  return (
    <Routes>
        {/* login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes/> }/>

        {/* Journal App */}
        <Route path="/*" element={ <JournalRoutes/> }/>
    </Routes>
  )
}
