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
        },
        setNotes: (state, action)=>{
            //Cargar las notas
        },
        setSaving: (state) =>{
            //Grabando las notas
        },
        updateNote: (state, action)=>{
            //Actualizar nota
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
    setSaving,
    updateNote,
    deleteNodeById
} = journalSlice.actions;