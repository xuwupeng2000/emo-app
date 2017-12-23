import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View, Text, H2, Col, Row, Grid, Button, Body, Container, Header, Content, Left, Right, Title, Icon } from 'native-base';
import { MapView } from 'expo';
import { httpClient } from './HttpClient.js'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {

  constructor() {
    super();

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      sensorList: [],
      geoTracks: []
    };
  }

  componentDidMount() {
    let _device = this.props.navigation.state.params.device;
    this.fetchGeoTracks(_device);
  }

  fetchGeoTracks(device) {
    let serialCode = device.serial_code;
    httpClient.get('/api/v1/user_geo_tracks', {
      params:
        { serial_code: serialCode }
    })
      .then((resp) => {
        let tracks = resp.data.geo_tracks;
        let sensors = resp.data.sensors;

        this.setState({ geoTracks: tracks, sensorList: sensors });

        let mostRecentIndex = (_.size(tracks) - 1);
        _.delay(() => {
          this.openMarkerCallout(mostRecentIndex);
        }, 100);
      })
      .catch((err) => {
        alert(err);
      });
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
      let coord = { latitude: track.lat, longitude: track.lng };
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
              <Button disabled={index === (_.size(this.state.geoTracks) - 1)} bordered full onPress={() => { this.panToNext(index) }}>
                <Text>Next</Text>
              </Button>
            </Col>
            <Col>
              <Button disabled={index === 0} bordered full onPress={() => { this.panToPrev(index) }} >
                <Text>Prev</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </View >
    );
  }

  panToPrev(index) {
    if (index != 0) {
      let nextIndex = index - 1;

      this.openMarkerCallout(nextIndex);
    }
  }

  panToNext(index) {
    if (index != (_.size(this.state.geoTracks) - 1)) {
      let prevIndex = index + 1; // most recent track is on the head of the array
      this.openMarkerCallout(prevIndex);
    }
  }

  openMarkerCallout(index) {
    let marker = this.refs[index];
    this.mapRef.animateToCoordinate(marker.props.coordinate);
    marker.showCallout();
  }

  renderPolylines() {
    let coords = _.map(this.state.geoTracks, (track) => {
      let coord = { latitude: track.lat, longitude: track.lng };
      return coord;
    });

    return (
      <MapView.Polyline
        strokeWidth={4}
        strokeColor='#34495e'
        coordinates={coords} />
    );
  }

  render() {
    let markers = this.renderMarkers();

    return (
      <Container>

        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          fitToElements={MapView.ANIMATED_FIT}
          ref={(ref) => { this.mapRef = ref }} >

          {markers}

        </MapView>

      </Container>
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
