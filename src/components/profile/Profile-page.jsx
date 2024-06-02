
import ProfileHeader from './profile-components/profile-header/Profile-header'
import ProfileMain from './profile-components/profile-main/Profile-Main';
import styles from './Profile-page.module.css'
const Profile = () => {


    return (

        <div className={styles["container"]}>
            <ProfileHeader></ProfileHeader>
            <ProfileMain />

        </div>
    )
}


export default Profile;