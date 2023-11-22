import * as React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';

import {decode} from '@mapbox/polyline';

// your google api key
const KEY = '';

export const MapViewCard = ({
  height,
  width,
  longitude,
  accuracy,
  latitude,
  startLat,
  endLat,
  startLong,
  endLong,
  startRouting = () => {},
  showResult = () => {},
}) => {
  const [coords, setCoords] = React.useState([]);

  const [error, setError] = React.useState(false);

  const [ready, setReady] = React.useState(false);

  const [end, setEnd] = React.useState({latitude: endLat, longitude: endLong});

  const [start, setStart] = React.useState({
    latitude: startLat,
    longitude: startLong,
  });

  const [startDetails, setStartDetails] = React.useState();
  const [youDetails, setYouDetails] = React.useState();

  // for calculating the delta for zooming of map on render
  accuracy = accuracy / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = accuracy / circumference;

  const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(startLat),
      Math.cos(angularDistance) - Math.sin(startLat) * Math.sin(startLat),
    ),
  );

  //get location using reverse geolocation
  const getLocationName = async (lat, long) => {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}`,
    );

    let respJson = await resp.json();

    return {
      district: respJson?.results[0]?.address_components[2] ?? {},
      street: respJson?.results[2]?.formatted_address ?? {},
    };
  };

  //get intermediate coordinates between 2 locations
  const getDirections = async (startLoc, destinationLoc) => {
    try {
      //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`,
      );
      let respJson = await resp.json();

      let points = decode(respJson.routes[0].overview_polyline.points);

      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      return coords;
    } catch (error) {
      return error;
    }
  };

  // function called to return details to parent component
  const returnNames = async () => {
    const startResult = await getLocationName(
      start?.latitude,
      start?.longitude,
    );
    const endResult = await getLocationName(end?.latitude, end?.longitude);

    showResult({
      start: startResult,
      end: endResult,
      startDuration: startDetails,
      youDuration: youDetails,
    });
  };

  // called every time a start or end (A or B) location is changed
  React.useEffect(() => {
    end && start && ready && returnNames();
  }, [end, start, ready]);

  React.useEffect(() => {
    //fetch the coordinates and then store its value into the coords Hook.
    getDirections(
      `${start.latitude},${start.longitude}`,
      `${end.latitude},${end.longitude}`,
    )
      .then(coords => setCoords(coords))
      .catch(err => Alert('Something went wrong'));
  }, [start, end]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        loadingEnabled={true}
        loadingIndicatorColor={'rgba(102, 92, 209, 1)'}
        style={{
          height: styles.map.height,
          width: styles.map.width,
        }}>
        <MapViewDirections
          origin={{latitude: start.latitude, longitude: start.longitude}}
          destination={{latitude: end.latitude, longitude: end.longitude}}
          waypoints={coords.length > 2 ? coords.slice(1, -1) : undefined}
          apikey={KEY}
          strokeWidth={3}
          splitWaypoints={true}
          showsTraffic={true}
          strokeColor="hotpink"
          timePrecision={'now'}
          optimizeWaypoints={true}
          onStart={params => {
            startRouting();
          }}
          onReady={result => {
            setReady(true);
            setStartDetails({
              distance: result.distance,
              duration: result.duration,
            });
          }}
          onError={() => setError(true)}
        />
        <MapViewDirections
          origin={{latitude: latitude, longitude: longitude}}
          destination={{latitude: start.latitude, longitude: start.longitude}}
          apikey={KEY}
          strokeWidth={6}
          strokeColor="rgba(102, 92, 209, 1)"
          timePrecision={'now'}
          optimizeWaypoints={true}
          onReady={result => {
            setYouDetails({
              distance: result.distance,
              duration: result.duration,
            });
          }}
        />
        {error && (
          //if there is error getting direction just display a straight line
          <Polyline
            zIndex={1}
            coordinates={[
              {latitude: latitude, longitude: longitude},
              {latitude: start.latitude, longitude: start.longitude},
            ]}
            strokeColor={'rgba(102, 92, 209, 1)'}
            strokeColors={['rgba(102, 92, 209, 1)']}
            strokeWidth={6}
          />
        )}
        {[
          {latitude: latitude, longitude: longitude, title: 'You'},
          {latitude: start.latitude, longitude: start.longitude, title: 'A'},
          {latitude: end.latitude, longitude: end.longitude, title: 'B'},
        ].map((a, i) => (
          <Marker
            key={i}
            draggable
            onDragEnd={value => {
              if (a.title == 'A') {
                setStart({
                  latitude: value?.nativeEvent.coordinate.latitude,
                  longitude: value?.nativeEvent.coordinate.longitude,
                });
                return;
              }
              if (a.title == 'B') {
                setStart({
                  latitude: value?.nativeEvent.coordinate.latitude,
                  longitude: value?.nativeEvent.coordinate.longitude,
                });
                return;
              }
            }}
            pinColor={'rgba(102, 92, 209, 1)'}
            title={a.title}
            coordinate={{
              latitude: a.latitude ?? '',
              longitude: a.longitude ?? '',
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 130,
    marginBottom: 20,
  },
});
