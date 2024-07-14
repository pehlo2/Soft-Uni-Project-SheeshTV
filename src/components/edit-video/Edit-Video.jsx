import { useContext, } from "react";
import useForm from "../../hooks/useForm";
import styles from "./Edit-Video.module.css"

import UserVideosContext from "../../context/userVideoContext";

import { object, string } from 'yup';





const EditVideo = ({ title,
    description,
    gameChoice,
    videoUrl, _id }) => {

    const { editVideo } = useContext(UserVideosContext)

    const EditSubmitHandler = async () => {

        if (!videoUrl) { return };
        await editVideo(_id, values);


    };
    const editVideoSchema = object({
        title: string().required('* Title is required').min(6, '* Title must be at least 6 characters'),
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
            .required('Game choice is is required')
    })


    const { values, onChange, onSubmit, validationErrors } = useForm(EditSubmitHandler, {
        title: title,
        description: description,
        gameChoice: gameChoice,
    }, editVideoSchema);



    return (
        <div className={styles["container"]}>
            <div className="media">
                <img src={values.videoUrl} alt="" />
            </div>
            <form className={styles["upload"]} onSubmit={onSubmit}>
                <div className={styles["input-field"]}>
                    <input type="text" name="title" placeholder='Title' value={values.title} onChange={onChange} />
                    {validationErrors.title && <p className='error'>{validationErrors.title}</p>}
                </div>
                <div className={styles["input-field"]}>
                    <textarea name="description" id="description" placeholder='Description' value={values.description} onChange={onChange}></textarea>
                    {validationErrors.description && <p className='error'>{validationErrors.description}</p>}
                </div>
                <div className={styles["input-field"]}>
                    <select name="gameChoice" id="gameChoice" value={values.gameChoice} onChange={onChange} >
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
                <button>Submit</button>
            </form>
        </div>

    )
};

export default EditVideo;

