import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/MapContainer';
import DataContainerOne from './components/DataContainerOne';
import DataContainerTwo from './components/DataContainerTwo';

class App extends Component {
  state = {
    initialIssData: {
      timestamp: "",
      latitude: "",
      longitude: ""
    },
    nextIssData: {
      timestamp: "",
      latitude: "",
      longitude: "",

    },
    distanceBetween: "",
    speed: "",
    success: false,
    errorMessage: ""
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchDataFromApi();
      if (this.state.nextIssData.timestamp != "") {
        const {
          initialIssData,
          nextIssData,          
        } = this.state;
        this.getDistanceFromLatLonInKm(initialIssData.latitude, initialIssData.longitude, nextIssData.latitude, nextIssData.longitude, this.deg2rad);
        if (this.state.distanceBetween) {
          this.calculateVelocity(this.state.distanceBetween, initialIssData.timestamp, nextIssData.timestamp );
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  //Get data from web API
  fetchDataFromApi = () => {
    const url = `http://api.open-notify.org/iss-now.json`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const issData = {
          timestamp: data.timestamp,
          latitude: data.iss_position.latitude,
          longitude: data.iss_position.longitude
        };
        if (!this.state.initialIssData.timestamp) {
          this.setState({
            initialIssData: issData,            
            errorMessage: ""
          });
        } else 
          this.setState({
            nextIssData: issData,
            errorMessage: ""
          });
      })
      .catch(error => {        
        this.setState({ errorMessage: error.message });
      });
  }

  //Calculate distance between two points using Haversine formula
  getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2, deg2rad) => {
    const R = 7033; // Radius of the earth in km + 408km ISS height + fix value :)
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = parseFloat((R * c).toFixed(4)); // Distance in km
    this.setState({
      distanceBetween: d
    });
  }

  //Convert degrees to radians
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  calculateVelocity = (dist, timeStart, timeEnd) => {
    const result = (dist / (timeEnd - timeStart)).toFixed(2);
    this.setState( { speed: result });
  }

  render() {
    const {
      initialIssData,
      nextIssData,
      errorMessage,
      distanceBetween,
      speed
    } = this.state;

    return (
      <div className="app">
        <div className="navbar">
        </div>        
        <div className="app-container">
          <div className="data-container">
            <div className="data-box-1">
              <DataContainerOne />
            </div>
            <div className="data-box-2">
              <DataContainerTwo />
            </div>
          </div>
          <div className="map-container">
            { this.state.nextIssData.latitude != "" ?
                <GoogleMap                    
                    markerOneLat={this.state.nextIssData.latitude}
                    markerOneLng={this.state.nextIssData.longitude}
                  />              
            : <h2>Loading...</h2>}
          </div>
       </div>
      </div>
    );
  }
}

export default App;
