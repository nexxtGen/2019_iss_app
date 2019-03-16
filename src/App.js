import React, { Component } from 'react';
import './App.css';

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
    success: false,
    errorMessage: ""
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchDataFromApi();
      if (this.state.nextIssData.timestamp) {
        const {
          initialIssData,
          nextIssData
        } = this.state;
        this.getDistanceFromLatLonInKm(initialIssData.latitude, initialIssData.longitude, nextIssData.latitude, nextIssData.longitude, this.deg2rad);
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
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = parseFloat((R * c).toFixed(1)); // Distance in km
    this.setState({
      distanceBetween: d
    });
  }

  //Convert degrees to radians
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  render() {
    const {
      initialIssData,
      nextIssData,
      errorMessage,
      distanceBetween
    } = this.state;

    return (
      <div className="App">
       <h1>My app</h1>
       <h5>Distance: {distanceBetween}km</h5>
       <p>Initial Iss Data</p>
       <p>Time: {initialIssData.timestamp}</p>
       <p>Lat: {initialIssData.latitude}</p>
       <p>Long: {initialIssData.longitude}</p>
       <p>Current Iss data:</p>       
       <p>Time: {nextIssData.timestamp}</p>
       <p>Lat: {nextIssData.latitude}</p>
       <p>Long: {nextIssData.longitude}</p>
       <h4>Errors: {errorMessage}</h4>
      </div>
    );
  }
}

export default App;
