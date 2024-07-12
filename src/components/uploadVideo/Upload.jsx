import { useContext, useState } from 'react';
import styles from './Upload.module.css'

import { endpoints } from '../../lib/endpoints';
import AuthContext from '../../context/authContext';
import UserVideosContext from '../../context/userVideoContext';
import { useVideoActions } from '../../hooks/useVideoActions';
import { Link } from 'react-router-dom';



const UploadVideo = () => {
    
    
    const {userId} = useContext(AuthContext)
    const {addVideo} = useVideoActions(userId);
    // const { addVideo } = useContext(UserVideosContext);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [game, setGame] = useState('')
    const [video, setVideo] = useState()

    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadSubmitHandler = async(e) => {
        e.preventDefault()
        if (!video) return;

        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('game', game)
        formData.append('userId', userId)
        formData.append('video', video)
       
        await addVideo(formData,setUploadProgress)
       
    };
   

    return (

        <div className={styles["container"]}>
            <form className={styles["upload"]} onSubmit={uploadSubmitHandler}>
                <input type="text" name="title" placeholder='Title' onChange={e => setTitle(e.target.value)} value={title} />
                <textarea name="description" id="description" placeholder='Description' onChange={e => setDescription(e.target.value)} value={description}></textarea>

                <select name="game" id="game" onChange={e => setGame(e.currentTarget.value)} value={game}>
                    <option value="Valorant">Valorant</option>
                    <option value="Counter Strike 2">Counter Strike 2</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Minecraft">Minecraft</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="GTA V">GTA V</option>
                    <option value="Apex Legends">Apex Legends</option>
                </select>
                <input type="file" name="video" onChange={(e) => { setVideo(e.target.files[0]) }} />


                {uploadProgress > 0 && (
                    <div style={{ width: '100%', backgroundColor: '#f3f3f3', marginTop: '10px' }}>
                        <div
                            style={{
                                width: `${uploadProgress}%`,
                                height: '20px',
                                backgroundColor: uploadProgress === 100 ? 'green' : 'blue',
                                transition: 'width 0.2s',
                            }}
                        />
                    </div>
                )}



                {uploadProgress > 0 && (<p>{Math.round(uploadProgress)}%</p>)}
                {uploadProgress == 100 && (<Link to={`/users/${userId}`}>Go to Video Page</Link>)}
                {uploadProgress === 0 && (<button>Submit</button>)}


            </form>


        </div>
    )
}

export default UploadVideo;