import { useContext } from 'react'
import AuthContext from '../../context/authContext'
import styles from './Home.module.css'
import SectionComponent from './Section-component'
import Notifications from '../notifications/Notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClapperboard, faCloudArrowUp, faComment, faGamepad, faGlasses, faMobileScreenButton, faShareNodes, faTv, faUserGroup, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Home = () => {
    const { userId } = useContext(AuthContext)

    return (
        <>

            <section className={styles['top-welcome']}>
                <div className={styles['media']}>
                    <video autoPlay muted loop>
                        <source
                            src="/video/into-page.mp4"
                            type="video/mp4"
                        />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={styles['container']}>
                    <div className={styles['inner']}>
                        <div className={styles['content']}>
                            <p>Your place to share</p>
                            <p>SHEEEEEESH</p>
                            <p>gaming Moments</p>
                        </div>
                        <div className={styles['review']}>
                            <a href="" className={styles['button']}>Share</a>
                        </div>
                    </div>
                </div>
            </section>




            <SectionComponent >
                <div className={styles['chat-section-inner']}>
                    <div className={styles['chat-review']} data-aos="fade-right"
                        data-aos-once="false">
                        <img src="/images/ChatFriends.webp" alt="" />
                    </div>
                    <div className={styles['chat-content']} data-aos="fade-left"
                        data-aos-once="false">
                        <h1>Chat with Your Friends</h1>
                        <div>
                            <p>Send Private across all devices! </p>
                            <p>Stay up to date with your friends</p>
                            <p>See your friends gaming moments </p>
                        </div>

                        <div>
                            <a href="" className={styles['button']}>Start Chat</a>
                        </div>
                    </div>

                </div>


            </SectionComponent>


            <SectionComponent  >
                <div className={styles['audiance']} data-aos="fade-right"
                    data-aos-offset="100"
                    data-aos-easing="ease-in-sine"
                    data-aos-once="false">
                    <div className={styles['audiance-wrapper']}>
                        <div className={styles['audiance-card']}>
                            <div className={styles["media"]}>
                                <FontAwesomeIcon icon={faWandMagicSparkles} />
                            </div>
                            <div className={styles["audiance-info"]}>
                                <h3>The Creators</h3>
                                <p>Creators are users who actively create content. Their main objective is to share it with others</p>
                            </div>

                        </div>
                        <div className={styles['audiance-card']}>
                            <div className={styles["media"]}>
                                <FontAwesomeIcon icon={faUserGroup} />
                            </div>
                            <div className={styles["audiance-info"]}>
                                <h3>The Players</h3>
                                <p> Players are users who game as their main free-time filler. They can be casual of hardcore</p>
                            </div>

                        </div>
                    </div>


                    <div className={styles['audiance-wrapper']}>
                        <div className={styles['audiance-card']}>
                            <div className={styles["media"]}>
                                <FontAwesomeIcon icon={faGlasses} />
                            </div>
                            <div className={styles["audiance-info"]}>
                                <h3>The Viewers</h3>
                                <p>Viewers are users who primarily enjoy watching and/or interacting with content</p>
                            </div>



                        </div>
                        <div className={styles['audiance-card']}>
                            <div className={styles["media"]}>
                                <FontAwesomeIcon icon={faClapperboard} />
                            </div>
                            <div className={styles["audiance-info"]}>
                                <h3>The Clippers</h3>
                                <p>Clippers are users who mainly use medal to save moments from their gameplay</p>
                            </div>

                        </div>

                    </div>


                </div>


            </SectionComponent>


            <SectionComponent >
                <div className={styles['share-content']} data-aos="fade-right" data-aos-once="false">
                    <div>
                        <h1>Share clips with a single Click</h1>
                    </div>
                    <div>
                        <p>Send clips directly to your Friends</p>
                        <p>Post to Your Profile</p>
                        <p>Share to social media</p>
                    </div>

                    <div>
                        <a href="" className={styles['button']}>Start Sharing</a>
                    </div>
                </div>
                <div className={styles['share-images']} data-aos="fade-left" data-aos-once="false">
                    <div className={styles['media']}>

                        <a href="https://www.facebook.com/ivanel.alexandrov"> <img src="/images/1.jpg" alt="" /></a>
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/128px-Telegram_2019_Logo.svg.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/2.jpg" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/8.jpg" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/reddit_5968908.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/5.jpg" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/twitter_3670151.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/6.jpg" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/10.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/twitch_4401442.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/images/7.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/128px-Facebook_Logo_2023.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/256px-Instagram_icon.png" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/github-desktop.svg" alt="" />
                    </div>
                    <div className={styles['media']}>
                        <img src="/icons/Logo-google-icon-PNG.png" alt="" />
                    </div>

                </div>
            </SectionComponent>

            <SectionComponent >

                <div className={styles["icons-dummy"]} data-aos="fade-up"
                    data-aos-once="false">
                    <div className={styles["icons-wrapper"]}>
                        <FontAwesomeIcon icon={faClapperboard} />
                        <FontAwesomeIcon icon={faComment} />
                        <FontAwesomeIcon icon={faShareNodes} />
                        <FontAwesomeIcon icon={faTv} />
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                        <FontAwesomeIcon icon={faGamepad} />

                    </div>
                    <Link to={'/login'}>Discover</Link>
                </div>

            </SectionComponent>


            <SectionComponent >
                <div className={styles['friends-content']} data-aos="fade-up-right" data-aos-once="false">
                    <h1>Find friends based on your shared Games</h1>
                    <p>Find someone you know</p>
                    <p>Start a conversation</p>
                    <p>Enjoy gamin together</p>
                </div>
                <div className={styles['friends-media']} data-aos="fade-up-left" data-aos-once="false">
                    {localStorage.getItem('theme') === 'dark' && <img src="/images/discover.png" alt="" />}
                    {localStorage.getItem('theme') === null && <img src="/images/discover.png" alt="" />}
                    {localStorage.getItem('theme') === 'light' && <img src="/images/discover2.png" alt="" />}

                </div>

            </SectionComponent>


        </>

    )
}


export default Home