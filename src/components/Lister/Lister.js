import React, {useEffect, useState} from 'react'
import './Lister.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setData} from '../../actions/dataActions'

const Lister = props => {
    const data = useSelector(state => state.data).data
    const dispatch = useDispatch()
    const jwt = localStorage.jwt
    const [page, setPage] = useState(1)
    const [pathname] = useState(props.location.pathname)
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)

    const getData = () => {
        axios.get(`http://localhost:8081/starwars/list${pathname}/${page}`, {
            headers: {"Authorization": `Bearer ${jwt}`}
        }).then(res => dispatch(setData(res.data)))
    }

    const getSearch = () => {
        axios.get(`http://localhost:8081/starwars/search${pathname}/${search}`, {
            headers: {"Authorization": `Bearer ${jwt}`}
        }).then(res => {
            dispatch(setData(res.data.results))
            setSearched(true)
        })
    }

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handleSearch = e => {
        if (e.keyCode === 13) getSearch()
    }

    const resetSearch = () => {
        setSearched(false)
        getData()
        document.getElementById('search-input').value = ''
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    useEffect(() => {
        getData()
    }, [page])

    return <div className="container">
        <div className="search">
            <input id="search-input" placeholder="Press enter to search" onChange={handleChange}
                   onKeyDown={handleSearch} type="text"/>
        </div>
        <div className="data">
            {data.map((item, i) => {
                const itemId = item.url.split('/')[5]
                return <Link to={`${pathname}/${itemId}`} key={i}>{item.name}</Link>
            })}
        </div>
        { !searched ?
            <div className="navigation">
                {page > 1 ? <div onClick={prevPage}>Prev</div> : <div/>}
                <p>{page}</p>
                {data.length === 10 ? <div onClick={nextPage}>Next</div> : <div/>}
            </div> : <div className="back-button" onClick={resetSearch}>Reset search</div>
        }
        <Link className="back-button" to="/">Go back home</Link>
    </div>
}

export default Lister
