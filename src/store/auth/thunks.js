//! Thunks: Son acciones que puedo dispatchar que tienen internamente una tarea asincrona 
//! Si son TAREAS SINCRONAS, se puede hacer en el redux

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = ( email, password) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() ); 
    }
}

export const startGoogleSignIn = ( ) =>{
    return async ( dispatch ) =>{
        dispatch ( checkingCredentials() );
        const result = await singInWithGoogle();
        // console.log({result});
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch( login( result ) );
    }
}

export const startCreatingWithEmailPassword = ({ email, password, displayName }) =>{
    return async( dispatch ) =>{
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});
        if(!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({email, password}) =>{
    return async( dispatch ) =>{
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({email, password});
        if(!result.ok) return dispatch(logout(result));
        dispatch( login( result ) );
    }
}

export const startLogout = () =>{
    return async ( dispatch )=>{
        await logoutFirebase();
        dispatch( logout() );
    }
}