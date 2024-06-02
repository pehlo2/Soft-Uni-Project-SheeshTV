import styles from './Home.module.css'
import SectionComponent from './Section-component'


const Home = () => {
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
                    {/* <!-- <img src="./video/maxresdefault.jpg" alt="" /> --> */}
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

                <div className={styles['chat-review']}>
                    <img src="/images/fawfaw.png" alt="" />
                </div>
                <div className={styles['chat-content']}>
                    <h1>Chat with Your Friends</h1>
                    <p>
                        Send Private and Group messages fawfawfaw fawfawfaw faf afawf afwa
                        faw fwaf waf fawfa wfaw faw faw f
                    </p>

                    <div>
                        <a href="" className={styles['button']}>Start Chat</a>
                    </div>
                </div>

            </SectionComponent>



            <SectionComponent >
                <div className={styles['share-content']}>
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
                <div className={styles['share-images']}>
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
                        <img src="/images/4.png" alt="" />
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
                <div className={styles['friends-content']}>
                    <h1>Find friends based on your shared Games</h1>
                    <p>Find someone you know</p>
                    <p>Start a conversation</p>
                    <p>Enjoy gamin together</p>
                </div>
                <div className={styles['friends-media']}>
                    <img src="/images/find ppl.png" alt="" />
                </div>

            </SectionComponent>


        </>

    )
}


export default Home