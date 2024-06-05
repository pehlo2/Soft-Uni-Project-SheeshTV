import { useState } from 'react';
import styles from './Upload.module.css'

const UploadVideo = () => {

    const [formValue, setFormValues] = useState({

        title: '',
        description: '',
        video: '',
        game: ''

    })

    const changeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))

    }
    const uploadSubmitHandler = (e) => {
        e.preventDefault()
        console.log(formValue);
    }

    return (
        <div className={styles["container"]}>
            <form className={styles["upload"]} onSubmit={uploadSubmitHandler}>
                <input type="text" name="title" placeholder='Title' onChange={changeHandler} value={formValue.title} />
                <textarea name="description" id="description" placeholder='Description' onChange={changeHandler} value={formValue.description}></textarea>

                <select name="game" id="game" onChange={changeHandler} value={formValue.game}> 
                    <option value="Valorant">Valorant</option>
                    <option value="Counter Strike 2">Counter Strike 2</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Minecraft">Minecraft</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="GTA V">GTA V</option>
                    <option value="Apex Legends">Apex Legends</option>
                </select>
                <input type="file" name="video" onChange={changeHandler} value={formValue.file} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UploadVideo;