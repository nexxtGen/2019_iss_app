import React, { Component } from 'react';
import './DataContainerTwo.css';
import BasicInfo from './information/BasicInfo';
import MoreInfo from './information/MoreInfo';

class DataContainerTwo extends Component {
    state = {
        information: 'basic'
    }

    handlerBasicInfo = () =>  {        
        this.setState({ information: 'basic'});
    }

    handlerMoreInfo = () =>  {        
        this.setState({ information: 'more'});
    }

    render() {
        return (
            <div className="data-container-two">
                <div className="buttons-conatiner">
                    <button onClick={this.handlerBasicInfo} className={ this.state.information === 'basic' ? "information-button-active" : 'information-button' } >Basic Information</button>
                    <button onClick={this.handlerMoreInfo} className={ this.state.information === 'more' ? "information-button-active" : 'information-button' } >More Information</button>
                </div>
            </div>
        )
    }
};

export default DataContainerTwo;