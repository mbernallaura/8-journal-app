//! Thunks: Son acciones que puedo dispatchar que tienen internamente una tarea asincrona 
//! Si son TAREAS SINCRONAS, se puede hacer en el redux

import { singInWithGoogle } from "../../firebase/providers";
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