import { useContext, useState } from "react";
import styles from './Update-profile.module.css'
import * as userServices from '../../services/userServices'
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const UpdateProfileModal = ({ profile , closeEdit,onUpdate }) => {

  
    const { userId } = useContext(AuthContext)
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
    const [avatar, setAvatar] = useState()
    const [description, setDescription] = useState(profile.description)
    const [email, setEmail] = useState(profile.email)
    const [username, setUsername] = useState(profile.username)


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
        formData.append('avatarToDelete',profile.avatar)

       await  userServices.updateProfile(formData,userId)
       closeEdit()
       onUpdate()
    }


    return (
        <div className={styles["blur"]} onClick={closeEdit}>
            <div className={styles["profile-edit"]}  onClick={(e) => e.stopPropagation()} >
                <img src={avatarPreview} alt="" />
                <form onSubmit={updateProfileSubmitHandler}>
                    <input type="file" name="avatar" id="avatar" onChange={handleAvatarChangeAndPreview} />
                    <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="text" name="description" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )

}

export default UpdateProfileModal;