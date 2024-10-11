import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
        // activeNote:{
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [] //htttps://foto1.jpg, htttps://foto2.jpg
        // }
    },
    reducers: {
        //!Las funciones del reducer deben ser SINCRONAS
        savingNewNote: (state) =>{
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) =>{
            //Crear una nueva entrada
            state.notes.push( action.payload );
            state.isSaving = false;        },
        setActiveNote: (state, action)=>{
            //Cuando clickee en una nota saber cual es
            state.activeNote = action.payload;
            
            //Cuando cambio de la nota activa quiero que no aparezca el mensaje
            state.messageSaved='';
        },
        setNotes: (state, action)=>{
            //Cargar las notas
            state.notes = action.payload
        },
        setSaving: (state) =>{
            //Grabando las notas
            state.isSaving = true;

            //Cuando ya se salva quiero que no aparezca el mensaje
            state.messageSaved='';
        },
        updateNote: (state, action)=>{
            //Actualizar nota
            state.isSaving = false;
            state.notes = state.notes.map((note) => note.id === action.payload.id ? action.payload : note);

            //Cuando la nota ya se actualiza
            state.messageSaved  = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote:(state, action) =>{
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNodeById: (state, action) =>{
            //Eliminar una nota dependienod del id
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote, 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
    deleteNodeById
} = journalSlice.actions;