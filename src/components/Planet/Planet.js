import React, {useEffect, useState} from 'react'
import '../Person/Person.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setItem} from '../../actions/dataActions'

const Planet = props => {
    const planet = useSelector(state => state.data).item
    const dispatch = useDispatch()

    const [id] = useState(props.match.params.id)
    const [films, setFilms] = useState([])
    const [residents, setResidents] = useState([])

    const getPlanet = () => {
        axios.get(`http://localhost:8081/starwars/planets/${id}`, {timeout: 3000})
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
            case 'people':
                axios.get(apiUrl).then(res =>
                    setResidents(prevResidents => {
                        return [...prevResidents, res.data]
                    }))
                break
            default:
                return
        }
    }

    const fillInfo = data => {
        data.films.map(film => {
            return getResource(film)
        })
        data.residents.map(resident => {
            return getResource(resident)
        })
    }

    useEffect(() => {
        getPlanet()
    }, [])

    return <div className="card">
        <section className="name">
            <h1>{planet.name}</h1>
        </section>
        <section className="info">
            <section className="basic-info">
                <p><b>Rotation period:</b> {planet.rotation_period}</p>
                <p><b>Orbital period:</b> {planet.orbital_period}</p>
                <p><b>Diameter:</b> {planet.diameter}</p>
                <p><b>Climate:</b> {planet.climate}</p>
                <p><b>Gravity:</b> {planet.gravity}</p>
                <p><b>Terrain:</b> {planet.terrain}</p>
                <p><b>Surface water:</b> {planet.surface_water}</p>
                <p><b>Population:</b> {planet.population}</p>
            </section>
            {residents.length === 0 && films.length === 0 ? '' :
                <section className="other-info">
                    {residents.length === 0 ? <></> : <b>Residents:</b>}
                    {residents.map((resident, i) => {
                        return <p key={i}>{resident.name}</p>
                    })}
                    {films.length === 0 ? <></> : <b>Appears in:</b>}
                    {films.map((film, i) => {
                        return <p key={i}>{film.title}</p>
                    })}
                </section>
            }
        </section>
        <Link className="back-button" to="/planets">Go back</Link>
    </div>
}

export default Planet
