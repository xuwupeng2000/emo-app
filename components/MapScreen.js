import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View, Container, Header, Content, Card, CardItem, Body, Text, Left, Badge, H2, Col, Row, Grid, Button } from 'native-base';
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
      sensorList: [],
      geoTracks: []
    };
  }

  componentDidMount() {
    this.fetchGeoTracks();
  }

  getCurrentUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }; // Not been used
      }, (err) => {
        alert(err);
      }
    );
  }

  renderMarkers() {
    let markers = this.state.geoTracks.map((track, index) => {
      let coord = {latitude: track.lat, longitude: track.lng};
      let description = this.renderDescription(track, index);

      return (
        <MapView.Marker  
          ref={index}
          key={track.id} 
          coordinate={coord} >

          <MapView.Callout tooltip={false} >
            {description}
          </ MapView.Callout>

        </MapView.Marker>
      );
    });

    return markers;
  }

  renderDescription(track, index) {
    let _part_1 = `Recorded at: ${track.created_at}`;
    let _part_2 = `By sensor(${track.sensor.serial_code}) of ${track.user.username}.`;
    let _index = `${index + 1}`;

    return (
      <View style={styles.callout}>
        <Grid>
          <Row>
            <Col>
              <H2 style={styles.index}>{_index}</H2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Text>{_part_1}</Text>
              </Row>
              <Row>
                <Text>{_part_2}</Text>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button disabled={index === (_.size(this.state.geoTracks) - 1)} bordered full onPress={() => { this.panToPrev(index) }}> 
                <Text>PREV</Text> 
              </Button>
            </Col>
            <Col>
              <Button disabled={index === 0} bordered full onPress={() => { this.panToNext(index) }}> 
                <Text>NEXT</Text> 
              </Button>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }

  panToNext(index) {
    if (index != 0) {
      let nextIndex = index - 1;

      let goForTrack = this.state.geoTracks[nextIndex];
      let goForCoord = {latitude: goForTrack.lat, longitude: goForTrack.lng};

      let currentTrack = this.state.geoTracks[index];
      let currentCoord = {latitude: currentTrack.lat, longitude: currentTrack.lng}; 

      let marker = this.refs[nextIndex];
      this.mapRef.animateToCoordinate(goForCoord);
      marker.showCallout();
    }
  }

  panToPrev(index) {
    if (index != (_.size(this.state.geoTracks) - 1)) {
      let prevIndex = index + 1; // most recent track is on the head of the array

      let currentTrack = this.state.geoTracks[index];
      let currentCoord = {latitude: currentTrack.lat, longitude: currentTrack.lng}; 

      let goForTrack = this.state.geoTracks[prevIndex];
      let goForCoord = {latitude: goForTrack.lat, longitude: goForTrack.lng};
      let marker = this.refs[prevIndex];
      this.mapRef.animateToCoordinate(goForCoord);
      marker.showCallout();
    }
  }
  
  renderPolylines() {
    let coords = _.map(this.state.geoTracks, (track) => {
      let coord = {latitude: track.lat, longitude: track.lng};
      return coord;
    });

    return (
      <MapView.Polyline 
        strokeWidth={4}
        strokeColor='#34495e'	
        coordinates={coords} />
    );
  }

  fetchGeoTracks() {
    httpClient.get('/api/v1/user_geo_tracks')
      .then((resp) => {
        let tracks = resp.data.geo_tracks;
        let sensors = resp.data.sensors;

        this.setState({ geoTracks: tracks, sensorList: sensors });

        let mostRecent = _.head(tracks);
        let mostRecentCoord = {latitude: mostRecent.lat, longitude: mostRecent.lng};
        this.mapRef.animateToCoordinate(mostRecentCoord, 1);
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    let markers = this.renderMarkers();
    let ploylines = this.renderPolylines();

    return (
      <MapView 
        style={{flex: 1}}
        region={ this.state.region }
        fitToElements={MapView.ANIMATED_FIT}
        ref={(ref) => { this.mapRef = ref }}
      >

      {markers}

      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: '#FFFFFF',
    padding: 5
  },
  index: {
    padding: 10,
    paddingTop: 20
  }
});
