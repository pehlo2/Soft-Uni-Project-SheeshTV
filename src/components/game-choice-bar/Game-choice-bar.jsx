import { useContext, useRef, useState } from 'react';
import styles from './Game-choice-bar.module.css'
import useForm from '../../hooks/useForm';
import VideoContext from '../../context/videoContext';

const GameChoiceBar = () => {


    const { filterVideosByGameChoice ,gameChoice} = useContext(VideoContext)

   console.log(gameChoice);
    const gameChoiceHandler = (values) => {

        filterVideosByGameChoice(values.gameChoice)
    }

    const { onChange, onSubmit } = useForm(gameChoiceHandler, {
        gameChoice: '',

    });

    const handleRadioChange = (e) => {
        onChange(e);
        gameChoiceHandler({ gameChoice: e.target.value });
    };
    return (

        <form className={styles["game-choice-bar"]} onSubmit={onSubmit}>

            <input type="radio" id="all" name="gameChoice" value="" className={styles['custom-radio']} onChange={handleRadioChange} checked={gameChoice === ""}/>
            <label htmlFor="all" className={styles['custom-radio-label']}>All</label>

            <input type="radio" id="valorant" name="gameChoice" value="Valorant" className={styles['custom-radio']} onChange={handleRadioChange}  />
            <label htmlFor="valorant" className={styles['custom-radio-label']}><img src="/gamesIcons/Valorant.png" alt="" /><span>Valorant</span></label>

            <input type="radio" id="counter-strike" name="gameChoice" value="Counter Strike 2" className={styles['custom-radio']} onChange={handleRadioChange} />
            <label htmlFor="counter-strike" className={styles['custom-radio-label']}> <img src="/gamesIcons/Counter Strike 2.png" alt="" /><span>Counter Strike 2</span></label>

            <input type="radio" id="fortnite" name="gameChoice" value="Fortnite" className={styles['custom-radio']} onChange={handleRadioChange} />
            <label htmlFor="fortnite" className={styles['custom-radio-label']}><img src="/gamesIcons/Fortnite.png" alt="" /><span>Fortnite</span></label>

            <input type="radio" id="lol" name="gameChoice" value="League of Legends" className={styles['custom-radio']} onChange={handleRadioChange} />
            <label htmlFor="lol" className={styles['custom-radio-label']}><img src="/gamesIcons/League of Legends.png" alt="" /><span>League of Legends</span></label>

            <input type="radio" id="minecraft" name="gameChoice" value="Minecraft" className={styles['custom-radio']} onChange={handleRadioChange} />
            <label htmlFor="minecraft" className={styles['custom-radio-label']}><img src="/gamesIcons/Minecraft.png" alt="" /><span>Minecraft</span></label>

            <input type="radio" id="gta" name="gameChoice" value="GTA V" className={styles['custom-radio']} onChange={handleRadioChange} />

            <label htmlFor="gta" className={styles['custom-radio-label']}><img src="/gamesIcons/GTA V.png" alt="" /><span>GTA V</span></label>

            <input type="radio" id="apex" name="gameChoice" value="Apex Legends" className={styles['custom-radio']} onChange={handleRadioChange} />

            <label htmlFor="apex" className={styles['custom-radio-label']}><img src="/gamesIcons/Apex Legends.png" alt="" /><span>Apex Legends</span></label>


            <input type="radio" id="wow" name="gameChoice" value="World Of Warcraft" className={styles['custom-radio']} onChange={handleRadioChange} />

            <label htmlFor="wow" className={styles['custom-radio-label']}><img src="/gamesIcons/World Of Warcraft.png" alt="" /><span>World Of Warcraft</span></label>

            <input type="radio" id="overwatch" name="gameChoice" value="Overwatch" className={styles['custom-radio']} onChange={handleRadioChange} />

            <label htmlFor="overwatch" className={styles['custom-radio-label']}><img src="/gamesIcons/Overwatch.png" alt="" /><span>Overwatch</span></label>


        </form>
    )
}
export default GameChoiceBar;
// ['Valorant', 'Counter Strike 2','Fortnite', 'League of Legends','Minecraft','Apex Legends','GTA V'],