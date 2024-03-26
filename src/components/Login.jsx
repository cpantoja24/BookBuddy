/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react"
import { Link } from 'react-router-dom'

export default function Login({ setToken }) {
    //State variables
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    //Submit function
    async function handleSubmit(event) {
        //Prevent page refresh while typing
        event.preventDefault()
        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            const result = await response.json();
            setToken(result.token)
            setSuccessMessage(result.message)
         
        } catch (error) {
            setError(error.message);
        }
        
        // reset form after submission
        setEmail("");
        setPassword("");
    }
    
    return (
        <>
            <h1>Login</h1>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <form method="post" onSubmit={handleSubmit}>
                <label> Email:{""}
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                </label>
                <br />
                <br />
                <label> Password:{""}
                    <input
                        type="text"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </label>
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            <h3>If you don't have an account click
                <Link to={'/register'}> here </Link> to create one</h3>
        </>
    )
}