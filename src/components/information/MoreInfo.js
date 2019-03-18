import React from 'react';
import './Info.css';

const MoreInfo = (props) => (
    <div className="basic-info-container">
       <div className="info-column-one">
            <p>ISS speed:</p>
            <p>Distance:</p>
            <p>Initial Lat:</p>
            <p>Initial Lng:</p>
            <p>Current Lat:</p>
            <p>Current Lng:</p>
            
       </div>
       { props.speed === "" ? 
            <div className="info-column-two">
                <p>Loading data...</p>
            </div> :
            <div className="info-column-two">
                <p>{ props.speed } km/h</p>
                <p>{ props.distance }km</p>
                <p>{ props.initialLat }</p>
                <p>{ props.initialLng }</p>
                <p>{ props.currLat }</p>
                <p>{ props.currLng }</p>
            </div>
       }
    </div>
);

export default MoreInfo;