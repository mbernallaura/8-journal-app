import { Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/";
import { login, logout } from "../store/auth";


export const AppRouter = () => {
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //!onAuthStateChanged(): es un observable, y sirve para ver si mi estado de autenticacion ha cambiado
    onAuthStateChanged( FirebaseAuth, async(user) =>{
      if(!user) return dispatch(logout());
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({uid, displayName, email, photoURL}));
    })
  
  }, [])
  
  if(status === 'checking') {
    return <CheckingAuth/>
  }
  return (
    <Routes>
      { 
        (status === 'authenticated')
        ?<Route path="/*" element={ <JournalRoutes/> }/> //Journal App
        :<Route path="/auth/*" element={ <AuthRoutes/> }/> //Login y registro
      }

      <Route path="/*" element={<Navigate to={'/auth/login'}/>}></Route>
    </Routes>
  )
}
