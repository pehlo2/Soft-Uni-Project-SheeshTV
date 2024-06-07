import { useState } from "react"

export default function useForm(submitHandler, initialValues) {
    let [values, setValues] = useState(initialValues)



    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
        ///NA inoputa na koisi steni mu novoto value
    }
    console.log(values);


    const onSubmit = (e) => {
        e.preventDefault()
        submitHandler(values)

    }
    return {
        values,
        onChange,
        onSubmit
    }

}





// const [formValues, setFormValues] = useState({
//     email: "",
//     password: ""
// })

// const changeHandler = (e) => {
//     console.log(e.target.name);
//     console.log(e.target.value);
//     setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))

// }


// const submitHandler = async (e) => {
//     e.preventDefault()
//     ///TO DO REQUEST
//     let user = await request.post(endpoints.login, formValues)
//     console.log(user);
//     navigate('/')

// }