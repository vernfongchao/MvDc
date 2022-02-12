import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './SearchBar.css'


const SearchBar = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState('')
    const questions = useSelector((state) => state.questionState.questions)
    console.log(questions)

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
                    type='text'
                    placeholder='Search....'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                >
                </input>
                <button ></button>
            </form>
        </div>
    )
}

export default SearchBar