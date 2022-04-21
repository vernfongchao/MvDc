import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './SearchBar.css'


const SearchBar = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        history.push(
            {
                pathname: '/search',
                search: '?query=abc',
                state: { detail: searchValue }
            }
        )
    }

    return (
        <div className='search-bar-page-container'>
            <form onSubmit={handleSearch}>
                <input
                    className='search-bar-input-text'
                    type='text'
                    placeholder='Search....'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                >
                </input>


                <button className='search-bar-button' >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

            </form>
        </div>
    )
}

export default SearchBar