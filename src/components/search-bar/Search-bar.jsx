import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from '../../hooks/useForm'
import { useContext, useEffect } from 'react'
import VideoContext from '../../context/videoContext';
import { useNavigate } from 'react-router-dom';
import styles from './Search-bar.module.css'
const SearchBar = () => {
    const navigate = useNavigate()



    const { filterVideosBySearchQuery } = useContext(VideoContext)

    useEffect(() => {
        window.addEventListener('SearchQueryChange', searchQueryChange);
        return () => {
            window.removeEventListener('SearchQueryChange', searchQueryChange);
        };
    }, []);

    const searchQueryChange = (event) => {
        setValues({
            search: event.detail

        })
    }
    const submitSearch = (values) => {
        filterVideosBySearchQuery(values.search)
        // resetHandler()
        navigate('/dashboard')
    }

    const { values, onChange, onSubmit, setValues } = useForm(submitSearch, {
        search: ""

    })

    // const resetHandler = () => {
    //     setValues({ search: "" })
    // }

    return (

        <form className={styles["search-bar"]} onSubmit={onSubmit}>
            <input type="search" name='search' placeholder="Search" onChange={onChange} value={values.search} />
            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
    )
}

export default SearchBar