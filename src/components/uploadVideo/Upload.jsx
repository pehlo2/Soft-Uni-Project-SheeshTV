import { useContext, useState } from 'react';
import styles from './Upload.module.css'
import AuthContext from '../../context/authContext';
import { useVideoActions } from '../../hooks/useVideoActions';
import { Link, useNavigate } from 'react-router-dom';
import { mixed, object, string } from 'yup';
import UserVideosContext from '../../context/userVideoContext';
import ErrorContext from '../../context/errorContext';
import CloseModalButton from '../close-modal-button/Close-modal-button';



const UploadVideo = () => {


    const { userId } = useContext(AuthContext)
    const { addVideo } = useContext(UserVideosContext);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [gameChoice, setGameChoice] = useState('')
    const [video, setVideo] = useState()
    const [uploadProgress, setUploadProgress] = useState(0);
    const [validationErrors, setValidationErrors] = useState({})
    const [videoPreview, setVideoPreview] = useState(null);
    const { handleErrorFunction } = useContext(ErrorContext)
    const [uploadedVideoId, setUploadedVideoId] = useState(null);
    const navigate = useNavigate()

    const uploadVideoSchema = object({
        title: string().required('* Title is required').min(3, '* Title must be at least 3 characters'),
        description: string().required('* Description is required').min(6, '* Description must be at least 6 characters'),
        gameChoice: string().oneOf([
            "Valorant",
            "Counter Strike 2",
            "League of Legends",
            "Minecraft",
            "Fortnite",
            "GTA V",
            "Apex Legends"
        ], 'Invalid game choice')
            .required('Game choice is is required'),
        video: mixed().required('Video file is required')
    })

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            const videoReader = new FileReader();
            videoReader.onloadend = () => {
                setVideoPreview(videoReader.result);
            };
            videoReader.readAsDataURL(file);
        }
    };

    const uploadSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('gameChoice', gameChoice);
        formData.append('userId', userId);
        formData.append('video', video);



        try {
            await uploadVideoSchema.validate({ title, description, gameChoice, video }, { abortEarly: false });
            setValidationErrors({});
              handleErrorFunction(async () => {
                const videoId = await addVideo(formData, setUploadProgress);
                console.log(videoId);
                
                setUploadedVideoId(videoId);
            });
        } catch (err) {
            const newError = {}
            err.inner.forEach(error => {
                newError[error.path] = error.message
            });
            setValidationErrors(newError)
        }
    };
    const handleCloseModal = () => {
        navigate('/dashboard');
    };

    return (

        <div className={styles["container"]}>
            <h2>Upload Video</h2>
            {videoPreview && (
                <video className={styles["video"]} controls controlsList="nodownload nofullscreen noplaybackrate noremoteplayback" disablePictureInPicture>
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            {!videoPreview && (
                <div className={styles["media"]}>
                    <img src="/images/player.png" alt="" />
                </div>
            )}
            <form className={styles["upload"]} onSubmit={uploadSubmitHandler}>


                <div className={styles["input-field"]}>
                    <input type="text" name="title" placeholder='Title' onChange={e => setTitle(e.target.value)} value={title} />
                    {validationErrors.title && <p className='error'>{validationErrors.title}</p>}
                </div>
                <div className={styles["input-field"]}>
                    <textarea name="description" id="description" placeholder='Description' onChange={e => setDescription(e.target.value)} value={description}></textarea>
                    {validationErrors.description && <p className='error'>{validationErrors.description}</p>}
                </div>
                <div className={styles["input-field"]}>
                    <select name="gameChoice" id="gameChoice" onChange={e => setGameChoice(e.currentTarget.value)} value={gameChoice} >
                        <option value="" disabled defaultValue hidden>Game</option>
                        <option value="Valorant">Valorant</option>
                        <option value="Counter Strike 2">Counter Strike 2</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="Fortnite">Fortnite</option>
                        <option value="GTA V">GTA V</option>
                        <option value="Apex Legends">Apex Legends</option>
                    </select>
                    {validationErrors.gameChoice && <p className='error'>{validationErrors.gameChoice}</p>}

                </div>
                <div className={styles["input-field"]}>
                    <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
                    {validationErrors.video && <p className='error'>{validationErrors.video}</p>}
                </div>

                {uploadProgress >0 && (
                    <div className={styles["progress-container"]}>
                        <div
                            className={`${styles["progress-bar"]} ${uploadProgress === 100 ? styles.complete : ''}`}
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}


                {uploadProgress > 0 && (<p>{Math.round(uploadProgress)}%</p>)}
                {uploadProgress == 100 && (<Link to={`/videos/${uploadedVideoId}`} className={styles["submit-button"]}>Go to Video Page</Link>)}
                {uploadProgress === 0 && (<button className={styles["submit-button"]}>Upload</button>)}


            </form>

            <CloseModalButton onClose={handleCloseModal}/>
        </div>
    )
}

export default UploadVideo;