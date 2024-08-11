import { useContext, useEffect, } from "react";
import useForm from "../../hooks/useForm";
import styles from "./Edit-Video.module.css"

import UserVideosContext from "../../context/userVideoContext";

import { object, string } from 'yup';
import CloseModalButton from "../close-modal-button/Close-modal-button";
import DisableBodyScroll from "../DisableBodyScroll";







const EditVideo = ({ title,
    thumbnail,
    description,
    gameChoice,
    videoUrl, _id, onClose }) => {

    const { editVideo } = useContext(UserVideosContext)

    useEffect(() => {
        document.body.classList.add('overflow-y-hidden');
        return () => {
            document.body.classList.remove('overflow-y-hidden');
        };
    }, []);
    const EditSubmitHandler = async () => {

        if (!videoUrl) { return };
        await editVideo(_id, values);
        onClose()

    };


    const editVideoSchema = object({
        title: string().required('* Title is required').min(6, '* Title must be at least 6 characters'),
        description: string().required('* Description is required').min(6, '* Description must be at least 6 characters'),
        gameChoice: string().oneOf([
            "Valorant",
            "Counter Strike 2",
            "Fortnite",
            "League of Legends",
            "Minecraft",
            "GTA V",
            "Apex Legends",
            "World Of Warcraft",
            "Overwatch",
        ], 'Invalid game choice')
            .required('Game choice is is required')
    })


    const { values, onChange, onSubmit, validationErrors } = useForm(EditSubmitHandler, {
        title: title,
        description: description,
        gameChoice: gameChoice,
    }, editVideoSchema);



    return (
        <>
            <DisableBodyScroll />
            <div className={styles["blur"]} onClick={onClose}>
                <div className={styles["container"]} onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Video</h2>
                    <div className={styles["media"]}>
                        <img src={thumbnail} alt="" />
                    </div>
                    <form className={styles["form-edit"]} onSubmit={onSubmit}>

                        <div className={styles["input-fields-wrapper"]}>
                            <div className={styles["input-field"]}>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" placeholder='Title' value={values.title} onChange={onChange} />
                                {validationErrors.title && <p className='error'>{validationErrors.title}</p>}
                            </div>
                            <div className={styles["input-field"]}>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" placeholder='Description' value={values.description} onChange={onChange}></textarea>
                                {validationErrors.description && <p className='error'>{validationErrors.description}</p>}
                            </div>
                            <div className={styles["input-field"]}>
                                <label htmlFor="gameChoice">Game</label>
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

                        </div>

                        <button className={styles["sumbit-button"]}>Submit</button>
                    </form>
                    <CloseModalButton onClose={onClose} />
                </div>
            </div>
        </>
    )
};

export default EditVideo;

