import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from '../../hooks/useForm'
const SearchBarForUsers = ({onSearch}) => {

    const submitSearch = (values) => {
        onSearch(values.search)
        resetHandler()
    }

    const { values, onChange, onSubmit ,setValues} = useForm(submitSearch, {
        search: ""

    })
   
    const resetHandler = () => {
        setValues({search: ""})
    }

    return (


        <form className="search-bar-users" onSubmit={onSubmit}>
            <input type="search" name='search' placeholder="search" onChange={onChange} value={values.search} />
            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
    )
}

export default SearchBarForUsers