import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native-animatable';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

const { width } = Dimensions.get('window');

import TenpoMarker from '../../components/map-marker';

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

class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: headerTitle(),
    headerTitleStyle: { color: 'white' },
    // headerRight: headerRight(navigation),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'rgba(51, 51, 51, 1)',
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    // check login flow
    if (!prevProps.listHistoryByUserIdFetched && this.props.listHistoryByUserIdFetched) {
      if (this.props.listHistoryByUserIdError) {
        Alert.alert('Error', this.props.listHistoryByUserIdError.message);
      }

      if (this.props.history.length === 0) {
        Alert.alert('Error', 'No history found.');
      }

      return;
    }
  }

  componentDidMount() {
    this.props.listHistoryByUserId();
  }

  card = (history) => {
    const { latitude, longitude, createdAt } = history.item;

    const region = {
      latitude: Number(latitude),
      latitudeDelta: 0,
      longitude: Number(longitude),
      longitudeDelta: 0,
    };

    const fromNow = moment(Number(createdAt.substr(0, 13))).fromNow();

    return (
      <View
        style={[
          styles.cardContainer,
          {
            ...(history.index === 0 ? { marginTop: 25 } : {}),
          },
        ]}
      >
        <View style={styles.cardMapContainer}>
          <MapView
            style={styles.cardMap}
            minZoomLevel={0}
            maxZoomLevel={15}
            zoomEnabled={false}
            zoomTapEnabled={false}
            scrollEnabled={false}
            region={region}
          >
            <Marker coordinate={region}>
              <TenpoMarker />
            </Marker>
          </MapView>
        </View>
        <View style={styles.cardContentContainer}>
          <View style={styles.cardContent}>
            <Text style={styles.cardContentText}>{fromNow}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { history } = this.props;
    return (
      <NativeViewGestureHandler>
        {history.length > 0 ? (
          <SafeAreaView style={styles.listContainer}>
            <FlatList data={history} renderItem={(h) => this.card(h)} keyExtractor={(h) => h.id} />
          </SafeAreaView>
        ) : (
          <View>
            <Text>No history found.</Text>
          </View>
        )}
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
  cardContainer: {
    marginBottom: 25,
  },
  cardMapContainer: {
    width: width * 0.9,
    height: 150,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
  cardMap: { width: '100%', height: '100%' },
  cardContentContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopColor: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    alignSelf: 'flex-end',
  },
  cardContentText: {
    color: 'rgba(0, 0, 0, 0.75)',
  },
  listContainer: {
    alignSelf: 'center',
  },
};

HistoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  listHistoryByUserId: PropTypes.func.isRequired,
  listHistoryByUserIdFetching: PropTypes.bool.isRequired,
  listHistoryByUserIdFetched: PropTypes.bool.isRequired,
  listHistoryByUserIdError: PropTypes.any,
};

export default HistoryScreen;
