import { useContext, useEffect, useState } from "react";
import styles from './Update-profile.module.css'
import * as userServices from '../../services/userServices'
import AuthContext from "../../context/authContext";

import { object, string } from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import CloseModalButton from "../close-modal-button/Close-modal-button";
import ErrorContext from "../../context/errorContext";

const UpdateProfileModal = ({ profile, closeEdit, onUpdate }) => {

    const { userId, updateProfileHandler } = useContext(AuthContext)
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
    const [avatar, setAvatar] = useState()
    const [description, setDescription] = useState(profile.description)
    const [email, setEmail] = useState(profile.email)
    const [username, setUsername] = useState(profile.username)
    const [validationErrors, setValidationErrors] = useState({})
    const { handleErrorFunction } = useContext(ErrorContext)
    useEffect(() => {
        document.body.classList.add('overflow-y-hidden');
        return () => {
            document.body.classList.remove('overflow-y-hidden');
        };
    }, []);
    const profileSchema = object({
        username: string().required('* Username is required').min(5, '* Username must be at least 5 characters'),
        description: string().required('* Description is required').min(5, '* Description must be at least 6 characters'),
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
            await handleErrorFunction(async () => {
                const updatedUser = await userServices.updateProfile(formData, userId);


                updateProfileHandler(updatedUser);
                closeEdit();
                onUpdate();
            });

        } catch (err) {

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
                <h2>Edit Profile</h2>
                <form onSubmit={updateProfileSubmitHandler}>
                    <div className={styles["avatar-header"]}>
                        <img className={styles["header-image"]} src="/images/header.jpg" alt="" />
                        <div className={styles["upload-avatar"]}>
                            <div className={styles["media"]}>
                                <img src={avatarPreview} alt="" />
                            </div>
                            <div className={styles["input-field"]}>
                                <input type="file" name="avatar" id="avatar" onChange={handleAvatarChangeAndPreview} className={styles["upload-icon"]} accept=".svg,.jpeg,.jpg ,.png" />
                                <label htmlFor="avatar"><FontAwesomeIcon icon={faUpload} /></label>
                            </div>
                        </div>
                    </div>
                    <div className={styles["input-fields-wrapper"]}>
                        <div className={styles["input-fields"]}>
                            {validationErrors.email && <p className={styles['error']}>{validationErrors.email}</p>}
                            <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={styles["input-fields"]}>
                            {validationErrors.username && <p className={styles['error']}>{validationErrors.username}</p>}
                            <input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className={styles["input-fields"]}>
                            {validationErrors.description && <p className={styles['error']}>{validationErrors.description}</p>}
                            <textarea type="text" name="description" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            <label htmlFor="description">Bio</label>
                        </div>
                    </div>
                    <button className={styles["submit-button"]}>Update</button>
                </form>
                <CloseModalButton onClose={closeEdit} />
            </div>
        </div>
    )
}

export default UpdateProfileModal;
