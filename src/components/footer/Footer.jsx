import styles from './Footer.module.css'


export default function Footer() {

    return (
        <footer>
            <div className={styles.container}>
                <div className={styles["footer-list"]}>
                <ul>
                    <h3>SheeshTV</h3>
                    <li>Discord</li>
                    <li>Creator</li>
                    <li>Github</li>
                    <li>Documentation</li>
                </ul>
                <ul>
                    <h3>Main</h3>
                    <li>Home</li>
                    <li>Discover</li>
                    <li>Chat</li>
                    <li>Business</li>
                </ul>
                <ul>
                    <h3>Profile</h3>
                    <li>View</li>
                    <li>Settings</li>
                    <li>Support</li>
                    <li>Dashboard</li>
                </ul>
                </div>
            
                <div className={styles.connections}>
                    <img src="/icons/128px-Facebook_Logo_2023.png" alt="" />
                    <img src="/icons/256px-Instagram_icon.png" alt="" />
                    <img src="/icons/Github-desktop-logo-symbol.svg" alt="" />
                   
                </div>
            </div>
        </footer>



    )
}