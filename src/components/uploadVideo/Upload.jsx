import { useState } from 'react';
import styles from './Upload.module.css'
import * as videoServices from '../../services/videoServices'
import { endpoints } from '../../lib/endpoints';


const UploadVideo = () => {

    // const [formValue, setFormValues] = useState({

    //     title: '',
    //     description: '',
    //     game: ''

    // })

    // const changeHandler = (e) => {
    //     setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))

    // }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [game, setGame] = useState('')
    const [video, setVideo] = useState()

    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadSubmitHandler = (e) => {
        e.preventDefault()
        if (!video) return;

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('game', game)
        formData.append('video', video)

        xhr.upload.addEventListener('progress', (event) => {
            console.log(event.loaded, event.total);
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        });

        xhr.upload.addEventListener('load', () => {
            console.log('Upload complete');
            setUploadProgress(100);
        });
        xhr.upload.addEventListener('error', () => {
            console.error('Upload failed');
            setUploadProgress(0);
        });
     
        xhr.upload.addEventListener('abort', () => {
            console.error('Upload Aborted');
            setUploadProgress(0);
        });
     

        xhr.open('POST', `http://localhost:3000${endpoints.upload}`);
        xhr.send(formData);
    };
    // const uploadSubmitHandler = async (e) => {

    //     e.preventDefault()
    //     const formData = new FormData()
    //     // for (const key in formValue) {
    //     //     formData.append(key, formValue[key])
    //     // }

    //     formData.append('title', title)
    //     formData.append('description', description)
    //     formData.append('game', game)
    //     formData.append('video', video)

    //     await videoServices.upload(formData)


    // }

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
                {uploadProgress == 100 && (<a>Go to Video Page</a>)}
                {uploadProgress === 0 && (<button>Submit</button>)}


            </form>


        </div>
    )
}

export default UploadVideo;