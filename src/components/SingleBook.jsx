/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

async function checkoutBook(id, token) {
    try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({available: true})
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(`frick ${error}`);
        return null;
    }

}

export default function SingleBook({ token }) {
    const [book, setBook] = useState({})
    const { id } = useParams()
    const [hasCheckedOut, setHasCheckedOut] = useState(false);

    useEffect(() => {
        async function fetchSingleBook() {
            try {

                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
                const book = await response.json();
                setBook(book)

            } catch (error) {
                console.error('Uh oh, trouble fetching single book!', error);
            }
        }
        fetchSingleBook()
    }, [])
    
    return (
        <div>
            <h2>Book Details</h2>
            {hasCheckedOut && <span style={{color: "red"}}>Successfully Checked Out</span>}
            {book && book.book && (
                <>
                    <h3>{book.book.title}</h3>
                    <p>By: {book.book.author}</p>
                    <img className='bookImg' src={book.book.coverimage} alt={book.book.title} />
                    <h3>Description:</h3>
                    <p>{book.book.description}</p>
                </>
            )}
            {token ? (
                <button onClick={() => {
                    const book = checkoutBook(id, token);
                    setHasCheckedOut(!!book);
                }}>Check Out</button>
            ) : (
                <div>
                    <h4>To check out a book please login or register below</h4>
                    <button><Link to={'/login'}>Login</Link></button>
                    <button><Link to={'/register'}>Register</Link></button>
                </div>
                
            )}
            <br />
            <br />
            <Link to={'/'}>Back to all Books</Link>
            <br />
            <Link to={'/account'}>Back to my account</Link>
            <br />
            <br />
        </div>
    );
}
