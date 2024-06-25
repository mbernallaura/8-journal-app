//! Thunks: Son acciones que puedo dispatchar que tienen internamente una tarea asincrona 
//! Si son TAREAS SINCRONAS, se puede hacer en el redux

import { checkingCredentials } from "./"

export const checkingAuthentication = ( email, password) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() ); 
    }
}

export const startGoogleSignIn = ( ) =>{
    return async ( dispatch ) =>{
        dispatch ( checkingCredentials() );
    }
}