import ProfileHeader from './profile-components/profile-header/Profile-header';
import ProfileMain from './profile-components/profile-main/Profile-Main';
import styles from './Profile-page.module.css';
import { useParams, useLocation, Outlet } from 'react-router-dom';
import { UserVideosProvider } from '../../context/userVideoContext';

const Profile = () => {
    const { profileId } = useParams();
    const location = useLocation();


    return (
        <div className={styles["container"]}>
            <UserVideosProvider profileId={profileId}>
                {location.pathname.endsWith('/upload') ? <Outlet /> : <><ProfileHeader /><ProfileMain /> </>}
            </UserVideosProvider>
        </div>
    );
};

export default Profile;
