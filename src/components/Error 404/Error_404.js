import React from 'react'
import './Error_404.css'
import {Link} from "react-router-dom";

const Error_404 = () => {
    return <div className="error-404">
        <h1>Error: 404</h1>
        <p>These are not the droids you are looking for ...</p>
        <Link to="/">Go back home</Link>
    </div>
}

export default Error_404
