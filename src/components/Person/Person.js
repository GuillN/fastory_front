import React, {useEffect, useState} from 'react'
import './Person.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setItem} from '../../actions/dataActions'

const Person = props => {
    const person = useSelector(state => state.data).item
    const dispatch = useDispatch()

    const [id] = useState(props.match.params.id)
    const [films, setFilms] = useState([])
    const [species, setSpecies] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [homeworld, setHomeworld] = useState('')

    const getPerson = () => {
        axios.get(`http://localhost:8081/starwars/people/${id}`, {timeout: 3000})
            .then(res => {
                dispatch(setItem(res.data))
                fillInfo(res.data)
            })
            .catch(() => {
                props.history.push('/404')
            })
    }

    const getResource = url => {
        const category = url.split('/')[4]
        const resourceId = url.split('/')[5]
        const apiUrl = `http://localhost:8081/starwars/${category}/${resourceId}`
        switch (category) {
            case 'films':
                axios.get(apiUrl).then(res =>
                    setFilms(prevFilms => {
                        return [...prevFilms, res.data]
                    }))
                break
            case 'species':
                axios.get(apiUrl).then(res =>
                    setSpecies(prevSpecies => {
                        return [...prevSpecies, res.data]
                    }))
                break
            case 'vehicles':
                axios.get(apiUrl).then(res =>
                    setVehicles(prevVehicles => {
                        return [...prevVehicles, res.data]
                    }))
                break
            case 'starships':
                axios.get(apiUrl).then(res =>
                    setStarships(prevStarships => {
                        return [...prevStarships, res.data]
                    }))
                break
            case 'planets':
                axios.get(apiUrl).then(res =>
                    setHomeworld(res.data))
                break
            default:
                return
        }
    }

    const fillInfo = data => {
        data.films.map(film => {
            return getResource(film)
        })
        data.species.map(species => {
            return getResource(species)
        })
        data.vehicles.map(vehicle => {
            return getResource(vehicle)
        })
        data.starships.map(starship => {
            return getResource(starship)
        })
        setHomeworld(getResource(data.homeworld))
    }

    useEffect(() => {
        getPerson()
    }, [])

    return <div className="card">
        <section className="name">
            <h1>{person.name}</h1>
        </section>
        <section className="info">
            <section className="basic-info">
                <p><b>Height:</b> {person.height}</p>
                <p><b>Mass:</b> {person.mass}</p>
                <p><b>Hair color:</b> {person.hair_color}</p>
                <p><b>Skin color:</b> {person.skin_color}</p>
                <p><b>Eye color:</b> {person.eye_color}</p>
                <p><b>Birth year:</b> {person.birth_year}</p>
                <p><b>Gender:</b> {person.gender}</p>
                <p><b>Homeworld:</b> {homeworld?.name}</p>
            </section>
            <section className="other-info">
                {species.length === 0 ? <></> : <b>Species:</b>}
                {species.map((species, i) => {
                    return <p key={i}>{species.name}</p>
                })}
                {films.length === 0 ? <></> : <b>Appears in:</b>}
                {films.map((film, i) => {
                    return <p key={i}>{film.title}</p>
                })}
                {vehicles.length === 0 ? <></> : <b>Vehicles possessed:</b>}
                {vehicles.map((vehicle, i) => {
                    return <p key={i}>{vehicle.name}</p>
                })}
                {starships.length === 0 ? '' : <b>Starships possessed:</b>}
                {starships.map((starship, i) => {
                    return <p key={i}>{starship.name}</p>
                })}
            </section>
        </section>
        <Link className="back-button" to="/people">Go back</Link>
    </div>
}

export default Person
