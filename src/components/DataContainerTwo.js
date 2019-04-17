import React, { Component } from "react";
import "./DataContainerTwo.css";
import BasicInfo from "./information/BasicInfo";
import MoreInfo from "./information/MoreInfo";

class DataContainerTwo extends Component {
  state = {
    information: "basic"
  };

  handlerBasicInfo = () => {
    this.setState({ information: "basic" });
  };

  handlerMoreInfo = () => {
    this.setState({ information: "more" });
  };

  render() {
    return (
      <div className="data-container-two">
        <div className="buttons-conatiner">
          <button
            onClick={this.handlerBasicInfo}
            className={
              this.state.information === "basic"
                ? "information-button-active"
                : "information-button"
            }
            aria-label="basic-info-btn"
          >
            Basic Information
          </button>
          <button
            onClick={this.handlerMoreInfo}
            className={
              this.state.information === "more"
                ? "information-button-active"
                : "information-button"
            }
            aria-label="more-info-btn"
          >
            More Information
          </button>
        </div>
        <div className="all-info-container">
          {this.state.information === "basic" ? (
            <BasicInfo
              speed={this.props.speed}
              distance={this.props.distance}
              time={this.props.time}
            />
          ) : (
            <MoreInfo
              speed={this.props.speed}
              distance={this.props.distance}
              initialLat={this.props.initialLat}
              initialLng={this.props.initialLng}
              currLat={this.props.currLat}
              currLng={this.props.currLng}
            />
          )}
        </div>
      </div>
    );
  }
}

export default DataContainerTwo;
