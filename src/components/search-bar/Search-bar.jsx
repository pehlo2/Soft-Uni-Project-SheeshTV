import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useForm from '../../hooks/useForm';
import { useContext, useEffect } from 'react';
import VideoContext from '../../context/videoContext';
import { useNavigate } from 'react-router-dom';
import styles from './Search-bar.module.css';

const SearchBar = () => {
    const navigate = useNavigate();
    const { filterVideosBySearchQuery, searchQuery} = useContext(VideoContext);

    useEffect(() => {
        setValues({ search: searchQuery });
    }, [searchQuery]);

    const submitSearch = (values) => {
        filterVideosBySearchQuery(values.search);
        navigate('/dashboard');
    };

    const { values, onChange, onSubmit, setValues } = useForm(submitSearch, {
        search: ""
    });

    return (
        <form className={styles["search-bar"]} onSubmit={onSubmit}>
            <input 
                type="search" 
                name='search' 
                placeholder="Search" 
                onChange={onChange} 
                value={values.search} 
            />
            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
    );
}

export default SearchBar;
