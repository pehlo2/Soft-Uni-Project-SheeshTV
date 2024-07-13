import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from '../../hooks/useForm'
import { useContext } from 'react'
import VideoContext from '../../context/videoContext';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
        const navigate =  useNavigate()



    const { filterVideosBySearchQuery} = useContext(VideoContext)


    const submitSearch = (values) => {
        filterVideosBySearchQuery(values.search)
        resetHandler()
        navigate('/dashboard')
    }

    const { values, onChange, onSubmit, setValues } = useForm(submitSearch, {
        search: ""

    })

    const resetHandler = () => {
        setValues({ search: "" })
    }

    return (

        <form className="search-bar" onSubmit={onSubmit}>
            <input type="search" name='search' placeholder="search" onChange={onChange} value={values.search} />
            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
    )
}

export default SearchBar