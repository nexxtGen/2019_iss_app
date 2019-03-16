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
    success: false,
    errorMessage: ""
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchDataFromApi();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

  render() {
    const {
      initialIssData,
      nextIssData,
      errorMessage
    } = this.state;
    return (
      <div className="App">
       <h1>My app</h1>
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
