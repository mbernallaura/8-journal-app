import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { getAccordionActionsUtilityClass } from "@mui/material";

const googleProvider = new GoogleAuthProvider();//? Crear una nuea instancia

export const singInWithGoogle = async() =>{
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result ); //!Se puede obtener las credenciales y el token 
        const { displayName, email, photoURL, uid } = result.user;
        return{
            ok:true,
            //User info
            displayName, email, photoURL, uid
        }
        // console.log({user});
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return{
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName})=>{
    try {
        const resp = await createUserWithEmailAndPassword (FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName }); //!FirebaseAuth.currentUser = saber el usuario actual en firebase
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        //? Rectificar que error hay 
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}



export const loginWithEmailPassword = async({email, password}) =>{
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password); //! Intentar ingresar con ese correo para saber si ya esta registrado, de lo contrario firebase manda error
        const {uid, photoURL, displayName} = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}