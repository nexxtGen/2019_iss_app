import React from 'react';
import './Info.css';

const BasicInfo = (props) => (
    <div className="basic-info-container">
       <div className="info-column-one">
            <p>ISS speed:</p>
            <p>Distance:</p>
            <p>Time:</p>
       </div>
        { props.speed === "" ? 
          <div className="info-column-two">
               <p>Loading data...</p>
          </div> :
          <div className="info-column-two">
               <p>{ props.speed } km/h</p>
               <p>{ props.distance } km</p>
               <p>{ props.time }</p>
          </div>
        }
    </div>
);

export default BasicInfo;