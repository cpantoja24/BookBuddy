/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Account({ token }) {

    const [error, setError] = useState(null);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        async function accountAuth() {
            try {

                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                const result = await response.json();
                setUser(result)

            } catch (error) {
                setError(error.message);
            }
        }
        accountAuth()
    }, [])

    return (
        <>
            <h1>My Account</h1>
            {error && <p>{error}</p>}
            
            {user && user.name === 'JsonWebTokenError' ?
                <div>
                    <h2>You are not currently logged in</h2>
                    <h3><Link to={'/login'}> Click here to login </Link></h3>
                    <h3><Link to={'/register'}> Click here to register </Link></h3>
                </div> :
                <div>
                    <div>
                        <p>First Name: {user.firstname}</p>
                        <p>Last Name: {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        {user.books && (
                            <>
                                <p>Current Books: {user.books.length}</p>
                                <div className="book">
                                    {user.books.map((book) => (
                                        <div key={book.id} className="bookCard">
                                            <h3>{book.title}</h3>
                                            <p>{book.author}</p>
                                            <img className='bookImg' src={book.coverimage} alt={book.title} />
                                            <br />
                                            <button onClick={() => {
                                                navigate(`/books/${book.id}`);
                                            }}>See Details</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <h3><Link to={'/'}> Click here to add books </Link></h3>
                    </div>
                </div>
            }
        </>
    );
}