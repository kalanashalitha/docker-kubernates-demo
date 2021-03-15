import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: props.jobs,
      showingInfoWindow: false,
      activeMarker: [],
      selectedPlace: [],
    }
  }

  componentDidMount(prevProps) {
    this.onClick = this.onClick.bind(this);
  }

  onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState(previousState => {
      return {
        jobs: [
          ...previousState.jobs,
          {
            title: "new plumbing job",
            description: "desc",
            userId: this.props.userId,
            marker: {
              title: "kalana",
              name: "shalitha",
              position: { lat, lng }
            }
          }
        ]
      };
    });
  }

  saveJobs = event => {
    event.preventDefault();
    console.log(JSON.stringify(this.state.jobs))
    axios.post(`http://localhost:8080/api/job/save-jobs`, this.state.jobs)
      .then((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      });
  }

  onMarkerClick = (props, marker, e) => {
    console.log("aaa"+JSON.stringify(props.title))
    this.setState({
      selectedPlace: props.title,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // onMapClicked = (props) => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }
  // };

  render() {
    return (
      <div>
        <button onClick={this.saveJobs}> Save Jobs </button> <br />
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          onClick={this.onClick}
        >
          {this.state.jobs.map((job, index) => (
            <Marker
              key={index}
              title={job.title}
              name={job.marker.name}
              position={job.marker.position}
              onClick={this.onMarkerClick}
            />
          ))}
          {this.state.activeMarker !== []? <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace}</h1>
            </div>
          </InfoWindow>: null }
          
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBfwyysUDXs-L80ctr-unjO4u8jUXHJwu4')
})(MapContainer)