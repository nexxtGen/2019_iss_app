import React, { Component } from 'react';
import './DataContainerOne.css'
import issImage from '../images/iss-2.jpg';

const DataContainerOne = (props) => (
    <div className="data-container-one">
        <div className="image-iss-box">
            <img src={issImage} />
        </div>
        <div className="data-container-one-text">
            <h2>ISS APP</h2>
            <button onClick={props.resetTracking}>Reset Tracking</button>            
        </div>
    </div>
);

export default DataContainerOne;