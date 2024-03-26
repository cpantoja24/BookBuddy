/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react"

export default function Register() {
    //State variables
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)

    //Submit function
    async function handleSubmit(event) {
        //Prevent page refresh while typing
        event.preventDefault();

        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ firstname, lastname, email, password }),
            })
            const result = await response.json();
 
            setSuccessMessage(result.message)
          
        } catch (error) {
            setError(error.message);
        }

        // reset form after submission
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return (
        <>
            <h1>Register for an account</h1>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <form method="post" onSubmit={handleSubmit}>
            <label> First Name:{""}
                <input
                    type="text"
                    value={firstname}
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
                />
            </label>
            <br />
            <br />
            <label> Last Name:{""}
                <input
                    type="text"
                    value={lastname}
                    onChange={(event) => {
                        setLastName(event.target.value)
                    }}
                />
            </label>
            <br />
            <br />
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
            <button type="submit">Create Account</button>
            </form>
        </>
    )
}
