import { useContext, useState } from 'react';
import styles from './Upload.module.css'
import AuthContext from '../../context/authContext';
import { useVideoActions } from '../../hooks/useVideoActions';
import { Link } from 'react-router-dom';
import { mixed, object, string } from 'yup';



const UploadVideo = () => {


    const { userId } = useContext(AuthContext)
    const { addVideo } = useVideoActions(userId);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [gameChoice, setGameChoice] = useState('')
    const [video, setVideo] = useState()
    const [uploadProgress, setUploadProgress] = useState(0);
    const [validationErrors, setValidationErrors] = useState({})


    const uploadVideoSchema = object({
        title: string().required('title is required').min(6, 'Title must be at least 6 characters'),
        description: string().required('description is required').min(6, 'description must be at least 6 characters'),
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

    const uploadSubmitHandler = async (e) => {
        e.preventDefault()


        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('gameChoice', gameChoice)
        formData.append('userId', userId)
        formData.append('video', video)

        try {

            await uploadVideoSchema.validate({ title, description, gameChoice, video }, { abortEarly: false });
            setValidationErrors({});
            await addVideo(formData, setUploadProgress)
        } catch (err) {
            const newError = {}
            err.inner.forEach(err => {
                newError[err.path] = err.message

            });
            setValidationErrors(newError)

        }

    };




    return (

        <div className={styles["container"]}>
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
                    <select name="gameChoice" id="gameChoice" onChange={e => setGameChoice(e.currentTarget.value)} value={gameChoice}>
                        <option value=""></option>
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
                    <input type="file" name="video" onChange={(e) => { setVideo(e.target.files[0]) }} />
                    {validationErrors.video && <p className='error'>{validationErrors.video}</p>}
                </div>






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