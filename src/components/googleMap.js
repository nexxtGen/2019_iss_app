import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline, Polygon} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const style = {
            width: '50%',
            height: '50%'
          };

        const pathCoordinates = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 16.466, lng: -60.118}
        ];
        return (
          <Map 
            google={this.props.google}
            zoom={4}
            style={style}
            initialCenter={{
                lat: 25.774,
                lng: -80.190
              }}
            center={{
                lat: 25.774,
                lng: -80.190
              }}              
            >
            <Polyline 
                path={pathCoordinates} 
                options={{ 
                strokeColor: '#00ffff',
                strokeOpacity: 1,
                strokeWeight: 2,
                icons: [{ 
                    icon: "hello",
                    offset: '0',
                    repeat: '10px'
                    }],
                }}
            />

            <Marker 
                title={'ISS station'}
                name={'Current location'}
                position={{lat: this.props.markerOneLat, lng: this.props.markerOneLng}}
             />

            <Marker 
                title={'Initial position ISS station'}
                name={'initial location'}
                position={{lat: 1.0365, lng: 155.6882}}
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
    apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
  })(MapContainer)