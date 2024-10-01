import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNotes } from "../store/journal";


export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        //!onAuthStateChanged(): es un observable, y sirve para ver si mi estado de autenticacion ha cambiado
        onAuthStateChanged( FirebaseAuth, async(user) =>{
            if(!user) return dispatch(logout());
            const { uid, displayName, email, photoURL } = user;
            dispatch(login( {uid, displayName, email, photoURL}) );
            dispatch( startLoadingNotes() );
        })
    
    }, []);

    return status;
}
