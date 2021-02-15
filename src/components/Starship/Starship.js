import React, {useEffect, useState} from 'react'
import '../Person/Person.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setItem} from '../../actions/dataActions'

const Starship = props => {
    const starship = useSelector(state => state.data).item
    const dispatch = useDispatch()

    const [id] = useState(props.match.params.id)
    const [films, setFilms] = useState([])
    const [pilots, setPilots] = useState([])

    const getStarship = () => {
        axios.get(`http://localhost:8081/starwars/starships/${id}`, {timeout: 3000})
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
                    setPilots(prevPilots => {
                        return [...prevPilots, res.data]
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
        data.pilots.map(pilot => {
            return getResource(pilot)
        })
    }

    useEffect(() => {
        getStarship()
    }, [])

    return <div className="card">
        <section className="name">
            <h1>{starship.name}</h1>
        </section>
        <section className="info">
            <section className="basic-info">
                <p><b>Model:</b> {starship.model}</p>
                <p><b>Manufacturer:</b> {starship.manufacturer}</p>
                <p><b>Cost in credits:</b> {starship.cost_in_credits}</p>
                <p><b>Length:</b> {starship.length}</p>
                <p><b>Max atmospheric speed:</b> {starship.max_atmosphering_speed}</p>
                <p><b>Crew:</b> {starship.crew}</p>
                <p><b>Passengers:</b> {starship.passengers}</p>
                <p><b>Cargo capacity:</b> {starship.cargo_capacity}</p>
                <p><b>Consumables:</b> {starship.consumables}</p>
                <p><b>Hyperdrive rating:</b> {starship.hyperdrive_rating}</p>
                <p><b>MGLT:</b> {starship.MGLT}</p>
                <p><b>Starship class:</b> {starship.starship_class}</p>
            </section>
            { pilots.length === 0 && films.length === 0 ? '' :
                <section className="other-info">
                    {pilots.length === 0 ? <></> : <b>Pilots:</b>}
                    {pilots.map((pilot, i) => {
                        return <p key={i}>{pilot.name}</p>
                    })}
                    {films.length === 0 ? <></> : <b>Appears in:</b>}
                    {films.map((film, i) => {
                        return <p key={i}>{film.title}</p>
                    })}
                </section>
            }
        </section>
        <Link className="back-button" to="/starships">Go back</Link>
    </div>
}

export default Starship
