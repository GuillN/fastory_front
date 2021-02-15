import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {toggleAuth} from '../../actions/authActions'

const Home = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.isAuth).isAuth
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8081/auth/signin', {username, password})
            .then(res => {
                dispatch(toggleAuth())
                localStorage.setItem('jwt', res.data)
            })
            .catch(() => {
                document.getElementById('form').reset()
                setError('Invalid username or password')
            })
    }

    const logOut = () => {
        localStorage.clear()
        dispatch(toggleAuth())
    }

    return <div>
        {!isAuth ?
            <div className="home">
                <h1>Hello, please log in</h1>
                {error === '' ? '' : <h4 className="error">{error}</h4>}
                <form id="form" className="home" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
            :
            <div className="home">
                <h1>Welcome to the Star Wars library</h1>
                <Link to="/people">People</Link>
                <Link to="/planets">Planets</Link>
                <Link to="/starships">Starships</Link>
                <Link to="/" onClick={logOut}>Log Out</Link>
            </div>
        }
    </div>
}

export default Home
