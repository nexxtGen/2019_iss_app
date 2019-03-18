import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import path from './path.js';

export class MapContainer extends Component {

    render() {
        const pathCoords = this.props.pathData;
        let pathCoords2 = this.props.pathData;
        console.log("path coords", pathCoords);
        return (
          <Map 
            containerStyle={{width: '100%', height: '100%', position: 'absolute', zIndex: '1'}}
            google={window.google}
            style={{width: '100%', height: '100%', position: 'absolute', zIndex: '16'}}
            zoom={5}
            initialCenter={{
                lat: this.props.markerOneLat,
                lng: this.props.markerOneLng
              }}                         
            >

            <Polyline   
                geodesic={true}                
                options={{
                    path: path,
                    strokeColor: '#00ffff',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    icons: [{
                        offset: '0',
                        repeat: '10px'
                    }],
                }}
            />

            <Marker
                title={`Initial ${ this.props.markerOneLat} , ${ this.props.markerOneLng } ISS location`}
                name={'INITIAL'}
                position={{lat: this.props.markerOneLat, lng: this.props.markerOneLng}}                
            />
            
            <Marker
                title={`Current ${ this.props.markerTwoLat} , ${ this.props.markerTwoLng } ISS location`}
                name={'CURRENT'}
                position={{lat: this.props.markerTwoLat, lng: this.props.markerTwoLng}}
                icon={{
                    url: "https://cdn1.iconfinder.com/data/icons/computer-and-internet/512/satellite_space_communication_broadcasting-512.png",
                    anchor: new window.google.maps.Point(14,14),
                    scaledSize: new window.google.maps.Size(40,40)
                }}
            />


            <InfoWindow>
                <div>
                  <h1>test</h1>
                </div>
            </InfoWindow>
          </Map>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"),    
  })(MapContainer)