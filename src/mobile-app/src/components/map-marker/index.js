import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native';

const TenpoMarker = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo_small.png')} style={styles.image} />
    </View>
  );
};

TenpoMarker.propTypes = {};

const styles = {
  container: {},
  image: {
    height: 25,
    width: 25,
    marginTop: 3,
  },
};

export default TenpoMarker;
