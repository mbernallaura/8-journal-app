import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";

import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote } from "../../store/journal";


export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote:note } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm( note );
    const dateString = useMemo(() =>{
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])
    
    const onSaveNote = () =>{
        dispatch(startSavingNote());
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn' 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>
                <Button
                    onClick={ onSaveNote } 
                    color="primary" 
                    sx={{ padding:2 }}
                >
                    <SaveOutlined sx={{ fontSize:30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Título"
                    sx={{ border:'none', mb:1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery/>
        </Grid>
    )
}
