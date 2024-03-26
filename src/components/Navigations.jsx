/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Books from './Books'
import Login from './Login'
import Account from './Account'
import SingleBook from './SingleBook'
import Register from './Register'

export default function NavBar() {
    const [token, setToken] = useState(null)

    return (
        <>
            <div id="navbar">
                <Link to={'/login'}>Login/Register</Link>
                <br />
                <Link to={'/account'}>Account</Link>
                <br />
                <Link to={'/'}>Home</Link>
            </div>
            <Routes>
                <Route path='/login' element={<Login setToken={setToken}/>} />
                <Route path='/account/*' element={<Account token={token}/>} />
                <Route path='/' element={<Books />} />
                <Route path='/books/:id' element={<SingleBook token={token}/>} />
                <Route path='/register' element={ <Register />} />
            </Routes>

        </>
    )
}
