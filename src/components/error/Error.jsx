
import styles from './Error.module.css'
export const ErrorComponent = ({ errMessage }) => {




    return (
        <div class={styles["container"]}>
            <div class={styles["error"]}>
                <p></p>
                <div class={styles["error-message"]}>
                    <h2>EROR</h2>
                    <p>wORNT</p>
                </div>
            </div>
            <div class={styles["button"]}>
            </div>
        </div>
    )

}

