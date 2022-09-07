import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";

class Map3 extends Component {
  state = {
    progress: [],
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  path = [
    { lat: -1.300355, lng: 36.77385 },
    { lat: -1.298982, lng: 36.776811 },
    { lat: -1.297459, lng: 36.776747 },
    { lat: -1.296193, lng: 36.776726 },
    { lat: -1.296097, lng: 36.779236 },
    { lat: -1.296151, lng: 36.777637 },
    { lat: -1.296215, lng: 36.776693 },
    { lat: -1.294252, lng: 36.776586 },
    { lat: -1.294048, lng: 36.77679 },
    { lat: -1.293973, lng: 36.779118 },
    { lat: -1.292622, lng: 36.779095 },
    { lat: -1.291844, lng: 36.779049 },
  ];

  

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          style={{ width: "100%", height: "100%" }}
          containerStyle={{height: "100vh",width: "100vw",}}
          zoom={15}
          initialCenter={{lat: -1.298982,lng: 36.776811,}}
        >
          <Polyline path={this.path} options={{ strokeColor: "#ff0000" }} />
          <Marker key="marker_1" onClick={this.onMarkerClick} title={"driver A"} name={"Driver A -1.300355, 36.773850 "}
            icon={{
              url: "./2.svg",
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(50, 50),
            }}
            position={{ lat: -1.300355, lng: 36.77385 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>

          <Marker
            key="marker_1"
            onClick={this.onMarkerClick}
            title={"driver B"}
            name={"Driver B -1.291879, 36.779049 "}
            icon={{
              url: "./2.svg",
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(50, 50),
            }}
            position={{ lat: -1.291879, lng: 36.778389 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default  GoogleApiWrapper({
    apiKey: "AIzaSyCZ6-yD_cZungcWysRqKsuo7T74CAS1Jsg",
  })(Map3);
