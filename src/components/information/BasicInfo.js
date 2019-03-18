import React from 'react';
import './Info.css';

const BasicInfo = (props) => (
    <div className="basic-info-container">
       <div className="info-column-one">
            <p>ISS speed:</p>
            <p>Distance:</p>
       </div>
        { props.speed === "" ? 
          <div className="info-column-two">
               <p>Loading data...</p>
          </div> :
          <div className="info-column-two">
               <p>{ props.speed } km/h</p>
               <p>{ props.distance } km</p>
          </div>
        }
    </div>
);

export default BasicInfo;