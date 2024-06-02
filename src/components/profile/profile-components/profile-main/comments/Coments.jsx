import styles from './Coments.module.css'


const Comments = () => {


    return (
        <section class={styles["comments"]}>
            <input type="text" placeholder="Be first to comment" />
            <a href="">Send</a>
        </section>

    )
}

export default Comments;