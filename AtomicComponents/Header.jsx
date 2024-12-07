import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  ImageHeadingComponent,
  ImageComponent1,
  ImageComponent2,
  fibeCoin,
}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.heading}>
          <TouchableOpacity>{ImageHeadingComponent}</TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          {fibeCoin}
          {ImageComponent1}
          {ImageComponent2}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 8,
    height: 40,
  },
  heading: {
    fontSize: 20,
    width: '60%',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '40%',
    gap: 10,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default Header;
