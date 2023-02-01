import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    // We are receiving formValidations from register page
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        // Every time the state of the form changes, launch createValidators
      createValidators();
    }, [formState])
    
    useEffect(() => {
        // WHen active note changes
        setFormState(initialForm)
    }, [initialForm])


    // Check the whole state of the form to see if all properties are ok
    const isFormValid = useMemo(() => {
        
        for (const formValue of Object.keys(formValidation)) {
            //if all the form fields are NOT null (not reporting errors, return false (form not ok))
            if(formValidation[formValue] !== null) return false; 
        }

        return true
    }, [formValidation]) 
    

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

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            //it comes from here => email: [ (value) => value.includes('@'), 'Email should have an @'],
            const [fn, errorMessage] = formValidations[formField];
            //  Comes from here => const { formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailvalid, passwordValid } = useForm(formData, formValidations)
            formCheckedValues[`${ formField }Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckedValues);
        // console.log(formCheckedValues)


    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid

    }
}