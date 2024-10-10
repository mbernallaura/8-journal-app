import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () =>{
    return async( dispatch, getState ) =>{
        dispatch( savingNewNote() );
        const { uid } = getState().auth;

        const newNote ={
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ));
        await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () =>{
    return async ( dispatch, getState ) =>{
        const { uid } = getState().auth;
        if (!uid ) throw new Error("El UID del usuario no existe");
        const notes =  await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSavingNote = () =>{
    return async(dispatch, getState)=>{
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { activeNote:note } = getState().journal;
        const noteToFirestore = {...note};
        delete noteToFirestore.id //!Se puede borrar un atributo con delete, es una propiedad de javascript
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge:true }); //! Se coloca el merge:true, para fusionar los datos que enviamos al id que ya hay en BD y para que no cree otro id sino se conserve el que ya tiene
        dispatch(updateNote(note));      
    }
}

export const startUploadingFiles = (files = []) =>{
    return async( dispatch ) =>{
        dispatch( setSaving() );
        await fileUpload(files[0]);
        
    }
}