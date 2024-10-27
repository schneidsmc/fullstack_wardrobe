import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '10px', justifyContent: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
                style={{ padding: '5px', flex: '0.5', width: '200px' }}
            />
            <button type="submit" style={{ padding: '5px', marginLeft: '5px' }}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;
