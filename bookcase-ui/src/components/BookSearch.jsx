import React, { useState } from 'react';

function BookSearch() {
    const [bookName, setBookName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/books/bookName?bookName=${bookName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setSearchResults(data);
            setError('');
        } catch (error) {
            setError('Failed to fetch books');
            setSearchResults([]);
        }
    };

    return (
        <div>
            <h2>Find Book by Name</h2>
            <form onSubmit={handleSearch}>
                <label htmlFor="bookName">Enter Book Name:</label>
                <input
                    type="text"
                    id="bookName"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((book) => (
                            <li key={book.id}>{`${book.title} - ${book.author}`}</li> // Adjust according to your BookDto structure
                        ))}
                    </ul>
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
}

export default BookSearch;
