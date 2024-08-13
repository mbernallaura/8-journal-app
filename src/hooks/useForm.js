import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState(); //?Validar si hay un error con los campos del form 
    useEffect(() => {
        createValidator();
    }, [formState])
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidator = () =>{
        const formCheckedValues = {};
        for (const formField of Object.keys( formValidations )) { 
            //!En la siguiente linea de codigo desfragmentamos el objeto para objetener la funcion que es con la que se valida los campos 
            const [ fn, errorMessage = 'Este campo es requerido' ] = formValidations[ formField ];

            //!formState[ formField ] para saber el valor de la funcion, aplicas lo del objeto de javascript
            //ejm: const formState ={email: function, password: 'Mustang'}
            //formState[email] => con esta nomenclatura sabemos que valor tiene el objeto formState en el atributo email, en este caso va a traer la funcion
            //Como la funcion es esta (value) => value.includes('@'), evalua si el string tiene @, si la funcion es verdad, entonces null sino, manda un mensaje de error
            //se capturo al desfragmentar el objeto
            formCheckedValues[`${ formField }Valid`] = fn(formState[ formField ]) ? null : errorMessage; 
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation
    }
}
