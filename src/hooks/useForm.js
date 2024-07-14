import { useState } from "react"

export default function useForm(submitHandler, initialValues, validationForm) {
    let [values, setValues] = useState(initialValues)
    let [validationErrors, setValidationErrors] = useState({});

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    const validate = async () => {
        try {

            await validationForm.validate(values, { abortEarly: false });
            setValidationErrors({});
            return true;
        } catch (err) {
            
            const newError = {}
            err.inner.forEach(err => {
                newError[err.path] = err.message

            });
            setValidationErrors(newError)
            return false

        }


    }



    const onSubmit = async (e) => {
        e.preventDefault()

        const isValidValid = await validate();
        console.log(isValidValid);
        if (isValidValid) {
            submitHandler(values)
        }

    }


    return {
        values,
        onChange,
        onSubmit, setValues, validationErrors
    }

}
