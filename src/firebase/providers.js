import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

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