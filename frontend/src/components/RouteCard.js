import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const RouteCard = ({ route, onDelete }) => {
    return (
        <div className="route-card">
            <h3>{route.name}</h3>
            <p>From: {route.source} → To: {route.destination}</p>
            <p>Duration: {Math.floor(route.duration / 60)}h {route.duration % 60}m</p>
            <p>Stops: {route.stops.join(', ')}</p>
            <button onClick={() => onDelete(route._id)}><FaTrashAlt /></button>
        </div>
    );
};

export default RouteCard;
