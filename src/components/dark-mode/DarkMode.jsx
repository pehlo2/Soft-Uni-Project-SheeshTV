import React from "react";
// import { ReactComponent as Sun } from "./Sun.svg";
// import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";
import Sun from "./Sun.svg?react"
import Moon from "./Moon.svg?react"
const DarkMode = ({toggleTheme}) => {

 
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={localStorage.getItem('theme') ==='dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Moon />
                <Sun />
            </label>
        </div>
    );
};

export default DarkMode;
