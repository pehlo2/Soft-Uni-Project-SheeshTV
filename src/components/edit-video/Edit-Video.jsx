import { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import styles from "./Edit-Video.module.css"
import * as  videoServices from "../../services/videoServices"
import { useNavigate } from "react-router-dom";
import UserVideosContext from "../../context/userVideoContext";







const EditVideo = ({ title,
    description,
    gameChoice,
    videoUrl, _id }) => {
    
    const { editVideo } = useContext(UserVideosContext)

    const EditSubmitHandler = async () => {

        if (!videoUrl) { return };
        await editVideo(_id, values);


    };

    const { values, onChange, onSubmit } = useForm(EditSubmitHandler, {
        title: title,
        description: description,
        gameChoice: gameChoice,
    });

   

    return (
        <div className={styles["container"]}>
            <div className="media">
                <img src={values.videoUrl} alt="" />
            </div>
            <form className={styles["upload"]} onSubmit={onSubmit}>
                <input type="text" name="title" placeholder='Title' value={values.title} onChange={onChange} />
                <textarea name="description" id="description" placeholder='Description' value={values.description} onChange={onChange}></textarea>
                <select name="gameChoice" id="gameChoice" value={values.gameChoice} onChange={onChange} >
                    <option value="Valorant">Valorant</option>
                    <option value="Counter Strike 2">Counter Strike 2</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Minecraft">Minecraft</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="GTA V">GTA V</option>
                    <option value="Apex Legends">Apex Legends</option>
                </select>
                <button>Submit</button>
            </form>
        </div>

    )
};

export default EditVideo