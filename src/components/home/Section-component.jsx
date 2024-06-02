import styles from './Section-component.module.css'

const SectionComponent = (props) => {


    return (

        <section className={styles['home-sections']}>
            <div className={styles['container']}>
                 {props.children}

            </div>
        </section>
    )
}

export default SectionComponent;