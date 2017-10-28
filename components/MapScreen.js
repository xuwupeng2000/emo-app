import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { MapView } from 'expo';
import authLogic from './AuthLogic.js'
import { httpClient } from './HttpClient.js'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {

  constructor(){
    super();

    this.state = { 
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      selectedGeoTrack: '',
      sensorList: [],
      geoTracks: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }, (err) => {
        alert(err);
      }
    );

    this.fetchGeoTracks();
  }

  renderMarkers() {
    let markers = this.state.geoTracks.map((track) => {
      let coord = {latitude: track.lat, longitude: track.lng};

      return (
        <MapView.Marker key={track.id} coordinate={coord} ></MapView.Marker>
      );
    });

    return markers;
  }

  fetchGeoTracks() {
    httpClient.get('/api/v1/user_geo_tracks')
      .then((resp) => {
        let tracks = resp.data.geo_tracks;
        let sensors = resp.data.sensors;

        this.setState({ geoTracks: tracks, sensorList: sensors });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    let markers = this.renderMarkers();
    return (
      <MapView style={{flex: 1}}
        region={ this.state.region }
      >

      {markers}

      </MapView>
    )
  }
}
