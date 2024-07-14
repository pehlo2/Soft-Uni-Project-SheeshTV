import { useContext, useState } from "react";
import styles from './Update-profile.module.css'
import * as userServices from '../../services/userServices'
import AuthContext from "../../context/authContext";

import { object, string } from 'yup';
const UpdateProfileModal = ({ profile, closeEdit, onUpdate }) => {


    const { userId } = useContext(AuthContext)
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
    const [avatar, setAvatar] = useState()
    const [description, setDescription] = useState(profile.description)
    const [email, setEmail] = useState(profile.email)
    const [username, setUsername] = useState(profile.username)
    const [validationErrors, setValidationErrors] = useState({})

    const profileSchema = object({
        username: string().required('* Username is required').min(6, '* Username must be at least 6 characters'),
        description: string().required('*Description is required').min(5, '* Description must be at least 6 characters'),
        email: string().required('* Email is required').email('* Invalid email format'),
    })




    const handleAvatarChangeAndPreview = (e) => {
        const file = e.target.files[0]

        if (file) {
            setAvatar(file)
            const avatarReader = new FileReader()
            avatarReader.onloadend = () => {
                setAvatarPreview(avatarReader.result)
            }
            avatarReader.readAsDataURL(file)

        }

    }



    const updateProfileSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (avatar !== undefined) {
            formData.append('avatar', avatar)
        }
        formData.append('email', email)
        formData.append('username', username)
        formData.append('description', description)
        formData.append('avatarToDelete', profile.avatar)




        try {

            await profileSchema.validate({
                email,
                username,
                description,
            }, { abortEarly: false });
            setValidationErrors({});


            await userServices.updateProfile(formData, userId)
            closeEdit()
            onUpdate()
        } catch (err) {
            console.log(err.inner);
            const newError = {}
            err.inner.forEach(err => {
                newError[err.path] = err.message

            });
            setValidationErrors(newError)

        }



    }





    return (
        <div className={styles["blur"]} onClick={closeEdit}>
            <div className={styles["profile-edit"]} onClick={(e) => e.stopPropagation()} >
                <img src={avatarPreview} alt="" />
                <form onSubmit={updateProfileSubmitHandler}>
                    <div className={styles["input-field"]}>
                        <input type="file" name="avatar" id="avatar" onChange={handleAvatarChangeAndPreview} />
                    </div>


                    <div className={styles["input-field"]}>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        {validationErrors.email && <p className='error'>{validationErrors.email}</p>}
                    </div>
                    <div className={styles["input-field"]}>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        {validationErrors.username && <p className='error'>{validationErrors.username}</p>}
                    </div>
                    <div className={styles["input-field"]}>
                        <input type="text" name="description" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        {validationErrors.description && <p className='error'>{validationErrors.description}</p>}

                    </div>


                    <button>Update</button>
                </form>
            </div>
        </div>
    )

}

export default UpdateProfileModal;