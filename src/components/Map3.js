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

  velocity = 5;
  initialDate = new Date();

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000; // pass to seconds
    return differentInTime * this.velocity; // d = v*t -- thanks Newton!
  };

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000);
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  moveObject = () => {
    const distance = this.getDistance();
    if (!distance) {
      return;
    }

    let progress = this.path.filter(
      coordinates => coordinates.distance < distance
    );

    const nextLine = this.path.find(
      coordinates => coordinates.distance > distance
    );
    if (!nextLine) {
      this.setState({ progress });
      return; // it's the end!
    }
    const lastLine = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    progress = progress.concat(position);
    this.setState({ progress });
  };

  componentWillMount = () => {
    this.path = this.path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 }; // it begins here!
      }
      const { lat: lat1, lng: lng1 } = coordinates;
      const latLong1 = new window.google.maps.LatLng(lat1, lng1);

      const { lat: lat2, lng: lng2 } = array[0];
      const latLong2 = new window.google.maps.LatLng(lat2, lng2);

      // in meters:
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      );

      return { ...coordinates, distance };
    });

    console.log(this.path);
  };


  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          style={{ width: "100%", height: "100%" }}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          zoom={15}
          initialCenter={{
            lat: -1.298982,
            lng: 36.776811,
          }}
        >
        {this.state.progress && (
          <div>
          <Polyline path={this.state.progress} options={{ strokeColor: "#ff0000" }} />
          <Marker
            key="marker_1"
            onClick={this.onMarkerClick}
            title={"driver A"}
            name={"Driver A -1.300355, 36.773850 "}
            icon={{
              url: "./2.svg",
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(50, 50),
            }}
            position={ this.state.progress[this.state.progress.length - 1]}
          />
          </div>
        )}
          
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
