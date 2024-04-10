import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/FloatingSearchButton.css';

const FloatingSearchButton = ({ isSearchActive, setIsSearchActive }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            document.body.classList.remove('search-active');
        };
    }, []);

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        document.body.classList.toggle('search-active');
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm) {
            try {
                const response = await fetch(`http://localhost:8000/food_search/?food_name=${encodeURIComponent(searchTerm)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('The requested resource could not be found.');
                    }
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Success:', data);
                sessionStorage.setItem('recommendations', JSON.stringify(data));
                document.body.classList.remove('search-active');
                navigate('/output');
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error.message); // Set the error message state
            }
        }
    };

    return (
        <div className={`control ${isSearchActive ? 'search-active' : ''}`}>
            <form onSubmit={handleSearchSubmit}>
                <button type="button" className="btn-material" onClick={toggleSearch}>
                    <span className="material-icons icon-material-search">search</span>
                </button>
                {isSearchActive ? (
                    <i className="icon-close material-icons" onClick={toggleSearch}>close</i>
                ) : (
                    <></> // No need to render search icon when not active
                )}
                {isSearchActive && (
                    <div className="search-input">
                        <input
                            className="input-search"
                            placeholder="What's on your mind? 🌟"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}
            </form>
            {errorMessage && (
                <div className="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert">
                    <i className="start-icon far fa-times-circle faa-pulse animated"></i>
                    <strong className="font__weight-semibold">Oopsie!</strong> <span>Sorry, not enough items to recommend. </span>
                    <button type="button" className="close" onClick={() => setErrorMessage('')}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default FloatingSearchButton;
