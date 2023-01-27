import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function MyApp() {
  const markerRef = React.useRef(null);
  const [latitude, setLatitude] = React.useState(LATITUDE);
  const [longitude, setLongitude] = React.useState(LONGITUDE);
  const [coordinate, setCoordinate] = React.useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
  );

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        const newCoordinate = {
          latitude: currentLatitude,
          longitude: currentLongitude,
        };
        // here you could push current location to back-end
        if (Platform.OS === 'android') {
          if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing({...newCoordinate, useNativeDriver: true}).start();
        }
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  React.useEffect(() => {
    setCoordinate(
      new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    );
  }, [latitude, longitude]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          followsUserLocation
          loadingEnabled>
          <Marker.Animated ref={markerRef} coordinate={coordinate} />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MyApp;
