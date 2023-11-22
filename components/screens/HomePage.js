import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TRUCK} from '../styles/styles';
import * as Location from 'expo-location';
import {MapViewCard} from '../reuseable/MapViewCard';

export const HomePage = ({navigation, route}) => {
  const [location, setLocation] = React.useState();

  const [details, setDetails] = React.useState();

  // calculate current time to get location
  function addMinutes(minutes) {
    const now = new Date(new Date().getTime() + minutes * 60000);

    return {hours: now.getHours(), minutes: now.getMinutes()};
  }

  // get user location
  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setLocation({...location.coords});
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'black', paddingBottom: 20}}>
      <View style={styles.topContainer}>
        <Text style={styles.topContainerHeader}>Your Routing Details</Text>
        <View style={styles.cardRow}>
          <View style={{flex: 0.55}}>
            <Image source={TRUCK} style={styles.truck} resizeMode={'cover'} />
          </View>

          {!details ? (
            // if no response from MapView component render a loader
            <ActivityIndicator color={'rgba(102, 92, 209, 1)'} />
          ) : (
            <View style={styles.cardColumnOpposite}>
              <View style={styles.cardRowOpposite}>
                <View style={{flex: 2}}>
                  <Text numberOfLines={1} style={styles.addressName}>
                    {details?.start?.street ?? '--'}
                  </Text>
                  <Text numberOfLines={1} style={styles.addressStreet}>
                    {details?.start?.district?.long_name ?? '--'}
                  </Text>
                </View>
                <View style={{flex: 0.7, alignItems: 'center'}}>
                  <Text style={styles.dateText}>22.10.23</Text>
                  <Text style={styles.addressTime}>
                    {addMinutes(details?.youDuration?.duration).hours +
                      ':' +
                      addMinutes(details?.youDuration?.duration).minutes}
                  </Text>
                </View>
              </View>

              <View style={styles.cardRowOpposite}>
                <View style={{flex: 2}}>
                  <Text numberOfLines={1} style={styles.addressName}>
                    {details?.end?.street ?? '--'}
                  </Text>
                  <Text numberOfLines={1} style={styles.addressStreet}>
                    {details?.end?.district?.long_name ?? '--'}
                  </Text>
                </View>
                <View style={{flex: 0.7, alignItems: 'center'}}>
                  <Text style={styles.dateText}>22.10.23</Text>
                  <Text style={styles.addressTime}>
                    {addMinutes(details?.startDuration?.duration).hours +
                      ':' +
                      addMinutes(details?.startDuration?.duration).minutes}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 2}}>
        <MapViewCard
          latitude={location?.latitude ?? 50.450001}
          longitude={location?.longitude ?? 30.523333}
          accuracy={location?.accuracy ?? 900}
          endLat={50.45333152}
          endLong={30.607997568}
          startLat={50.450001}
          startLong={30.523333}
          showResult={value => {
            setDetails(value);
          }}
          startRouting={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1,
  },
  topContainerHeader: {
    color: 'rgba(102, 92, 209, 1)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardRowOpposite: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardColumnOpposite: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 15,
    alignItems: 'center',
  },
  truck: {
    height: 100,
    width: 120,
    borderRadius: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '200',
  },
  addressName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
  addressStreet: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
  },
  addressTime: {
    color: 'rgba(102, 92, 209, 1)',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
