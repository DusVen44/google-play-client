import React from 'react';
import './PlayApp.css'

export default function PlayApp(props) {
    return (
        <div className="app-info">
            <h2>{props.App}</h2>
            <p>Rating: {props.Rating}</p>
            <p>Genre: {props.Genres}</p>
        </div>
    )
}
