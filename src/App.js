import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/MapContainer';
import DataContainerOne from './components/DataContainerOne';
import DataContainerTwo from './components/DataContainerTwo';
import git from './images/github.png';

class App extends Component {
  state = {
    initialIssData: {
      timestamp: "",
      latitude: "",
      longitude: ""
    },
    currentIssData: {
      timestamp: "",
      latitude: "",
      longitude: "",

    },
    distanceBetween: "",
    speed: "",
    time: "",
    errorMessage: "-",
    pathData: []
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchDataFromApi();
      if (this.state.currentIssData.timestamp !== "") {
        const {
          initialIssData,
          currentIssData,
          //pathData
        } = this.state;
        this.getDistanceFromLatLonInKm(
          initialIssData.latitude, 
          initialIssData.longitude, 
          currentIssData.latitude, 
          currentIssData.longitude, 
          this.deg2rad
          );
        //this.pathData(currentIssData.latitude, currentIssData.longitude, pathData);
        if (this.state.distanceBetween) {
          this.calculateVelocity(this.state.distanceBetween, initialIssData.timestamp, currentIssData.timestamp );
          this.calculateTime(initialIssData.timestamp, currentIssData.timestamp)
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
            errorMessage: "-"
          });
        } else 
          this.setState({
            currentIssData: issData,
            errorMessage: "-"
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
    const d = parseFloat((R * c).toFixed(2)); // Distance in km
    this.setState({
      distanceBetween: d
    });
  }

  //Convert degrees to radians
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  // Calculate ISS speed in km/h
  calculateVelocity = (dist, timeStart, timeEnd) => {
    const result = (dist / (timeEnd - timeStart)).toFixed(2);
    this.setState( { speed: result });
  }

  // Reset current ISS tracking data
  resetTracking = () => {
    this.setState({
      initialIssData: {
        timestamp: "",
        latitude: "",
        longitude: ""
      },
      currentIssData: {
        timestamp: "",
        latitude: "",
        longitude: "",
  
      },
      distanceBetween: "",
      speed: "",
      time: "",
      errorMessage: "-"
    })
  }

  // Create path data
  pathData = (lat, lng, dataState) => {
    const data = dataState;
    data.push({lat: parseFloat(lat), lng: parseFloat(lng)});
    this.setState({
      pathData: data
    });
  }

  // calculate time
  calculateTime = (start, end) => {
    const seconds = Number(end- start);
    //const d = Number(seconds);
    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor(seconds % 3600 / 60);
    var secs = Math.floor(seconds % 3600 % 60);

    var hDisplay = hours > 0 ? hours + (hours === 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = mins > 0 ? mins + (mins === 1 ? " min, " : " mins, ") : "";
    var sDisplay = secs > 0 ? secs + (secs === 1 ? " sec" : " secs") : "";
    const time = hDisplay + mDisplay + sDisplay;
    this.setState({
      time: time
    })
  }

  render() {
    const {
      initialIssData,
      currentIssData,
      errorMessage,
      distanceBetween,
      speed,
      time,      
    } = this.state;

    return (
      <div className="app">
        <div className="navbar">
          <div className="navbar-container">
            <div className="navbar-container-git">
              <a href="https://github.com/nexxtGen/2019_iss_app" target="_blank">
                <img src={ git } alt="miau" className="miau-github-icon"/>
              </a>
            </div>
            <div className="navbar-container-errors">
              <p>Errors: { errorMessage }</p>
            </div>
          </div>
        </div>        
        <div className="app-container">
          <div className="data-container">
            <div className="data-box-1">
              <DataContainerOne
                resetTracking={ this.resetTracking }                
               />
            </div>
            <div className="data-box-2">
              <DataContainerTwo
                speed={ speed }
                time= { time }
                distance={ distanceBetween }
                initialLat={ initialIssData.latitude }
                initialLng={ initialIssData.longitude }
                currLat={ currentIssData.latitude }
                currLng={ currentIssData.longitude }
               />
            </div>
          </div>
          <div className="map-container">
            { this.state.currentIssData.latitude !== "" ?
                <GoogleMap                    
                    markerOneLat={ initialIssData.latitude }
                    markerOneLng={ initialIssData.longitude }
                    markerTwoLat={ currentIssData.latitude }
                    markerTwoLng={ currentIssData.longitude }
                    //pathData={ pathData }
                  />              
            : <h2>Loading...</h2>}
          </div>
       </div>
      </div>
    );
  }
}

export default App;
