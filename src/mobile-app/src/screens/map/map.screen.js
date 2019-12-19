import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import TenpoMarker from '../../components/map-marker';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { santiagoCoord } from '../../utils/constants';
import { View } from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const headerTitle = () => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 15,
    }}
  >
    <Image source={require('../../../assets/tenpo_logo.png')} style={styles.navigationOptionsHeaderTitleImage} />
    <Text style={styles.navigationOptionsHeaderTitleText}>TENPO CHALLENGE</Text>
  </View>
);

const headerRight = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('History')} style={{ paddingRight: 15 }}>
      <FontAwesome name={'history'} size={25} style={{ color: 'white' }} />
    </TouchableOpacity>
  );
};

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: headerTitle(),
    headerTitleStyle: { color: 'white' },
    headerRight: headerRight(navigation),
    headerStyle: {
      backgroundColor: 'rgba(51, 51, 51, 1)',
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      //define region for latam
      // region: {
      //   latitude: -33.44933883213115,
      //   latitudeDelta: 0,
      //   longitude: -70.66954744979739,
      //   longitudeDelta: 0,
      // },
      region: santiagoCoord,

      currentLoading: false,
      current: null,

      showFindButton: false,
      disableFindButton: true,
      first: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.first === true && nextState.first === false) {
      return true;
    }

    if (this.state.region !== nextState.region) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Error', 'Should use real device');
    } else {
      this.getLocationAsync();
    }
  }

  componentDidUpdate(prevProps) {
    // check login flow
    if (!prevProps.listRestaurantsByCoordFetched && this.props.listRestaurantsByCoordFetched) {
      if (this.props.listRestaurantsByCoordError) {
        Alert.alert('Error', this.props.listRestaurantsByCoordError.message);
      }

      if (this.props.restaurants.length === 0) {
        Alert.alert('Error', 'No restaurants found.');
      }

      return;
    }
  }

  getLocationAsync = async () => {
    this.setState({ currentLoading: true });
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission to access location was denied');
    }

    let location;
    try {
      location = await Location.getCurrentPositionAsync({});
    } catch (err) {
      // Go to default coord
      this.setState({
        current: santiagoCoord,
        currentLoading: false,
      });

      // TODO(ca): show error message in app
      return;
    }

    this.setState({
      current: {
        ...location.coords,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      currentLoading: false,
    });

    this.mapView.animateToRegion(this.state.current, 2000);
    setTimeout(() => this.setState({ showFindButton: true, region: this.state.current, first: false }), 2500);
  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  findZone = () => {
    const { latitude, longitude } = this.state.region;
    this.props.listRestaurantsByCoord(latitude, longitude);
  };

  tenpoIcon = () => (
    <View animation={'bounceIn'} duration={1200} delay={200} style={styles.tenpoIconContainer}>
      <TenpoMarker />
    </View>
  );

  searchFindButton = () => (
    <View animation={'bounceIn'} duration={1200} delay={200} style={styles.searchButtonContainer}>
      <TouchableOpacity style={styles.searchButtonTouchable} onPress={() => this.findZone()}>
        <Text style={styles.searchButtonText}>Search in this area</Text>
      </TouchableOpacity>
    </View>
  );

  locationButton = () => (
    <TouchableOpacity style={styles.locationButtonContainer} onPress={() => this.getLocationAsync()}>
      <View style={styles.locationButtonSubContainer}>
        {this.state.currentLoading ? (
          <ActivityIndicator size="small" color="#4d4d4d" />
        ) : (
          <FontAwesome name={'crosshairs'} size={35} style={styles.locationButtonIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  showMarker = (restaurant, index) => (
    <Marker
      key={index}
      coordinate={restaurant.coord}
      title={restaurant.name}
      description={`${restaurant.rating.substr(0, 3)} Points / ${restaurant.open ? 'Open' : 'Close'}`}
    />
  );

  showMapview = () => (
    <MapView
      ref={(ref) => (this.mapView = ref)}
      style={styles.container}
      onPress={this.onPressHandler}
      region={this.state.region}
      onRegionChange={this.onRegionChange}
      minZoomLevel={0}
      maxZoomLevel={15}
    >
      {this.props.restaurants.map((restaurant, index) => this.showMarker(restaurant, index))}
    </MapView>
  );

  render() {
    return (
      <NativeViewGestureHandler>
        <View style={styles.container}>
          {this.state.showFindButton ? this.tenpoIcon() : null}
          {this.state.showFindButton ? this.searchFindButton() : null}

          {this.locationButton()}
          {this.showMapview()}
        </View>
      </NativeViewGestureHandler>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    zIndex: 1,
  },
  navigationOptionsHeaderTitleImage: {
    marginTop: 2,
    width: 25,
    height: 25,
  },
  navigationOptionsHeaderTitleText: {
    marginTop: 2,
    marginLeft: 10,
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  tenpoIconContainer: {
    zIndex: 2,
    alignSelf: 'flex-start',
    position: 'absolute',
    // height / 2 ~> mid height screen
    // - 60 ~> header bar
    // + 30 / 2  ~> middle height tenpo icon marker
    top: height / 2 - 60 + 25 / 2,
    left: width / 2 - 30 / 2,
  },
  searchButtonContainer: {
    zIndex: 4,
    position: 'absolute',
    top: 15,
    width,
  },
  searchButtonTouchable: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    borderColor: '#666666',
    borderWidth: 1,
    shadowColor: '#666666',
    shadowRadius: 10,
    shadowOpacity: 1,
    alignSelf: 'center',
  },
  searchButtonText: {
    color: '#666666',
  },
  locationButtonContainer: {
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 25,
    marginBottom: 25,
  },
  locationButtonSubContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 60,
    height: 60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,

    borderColor: '#666666',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#666666',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  locationButton: {
    color: '#666666',
  },
};

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  listRestaurantsByCoord: PropTypes.func.isRequired,
  listRestaurantsByCoordFetching: PropTypes.bool.isRequired,
  listRestaurantsByCoordFetched: PropTypes.bool.isRequired,
  listRestaurantsByCoordError: PropTypes.any,
};

export default MapScreen;
