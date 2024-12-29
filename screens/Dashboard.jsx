/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chart from '../components/Chart/Chart';
import {typography} from '../theme/typography';
import {Divider} from '@rneui/themed';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {groupData, PAGE_WIDTH} from '../utils/utils';

const renderItem = ({item}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {item.map((_, index) => {
        return (
          <View key={index} style={styles.animatedContainer3}>
            <View style={styles.animatedContainer2}>
              <Text style={{color: '#000'}}>
                <Icon name="file-plus-outline" color="#fff" size={30} />
              </Text>
            </View>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                padding: 2,
                fontFamily: typography.primary,
                fontWeight: 400,
              }}>
              Sole Invoice
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default function Dashboard() {
  const [number, setNumber] = useState(0);
  const progress = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  };

  const CustomPagination = ({data, onPressPagination}) => {
    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        {data.map((_, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPressPagination(index)}
              style={{
                width: number === index ? 20 : 10,
                height: 7,
                borderRadius: 5,
                backgroundColor: number === index ? '#25A7F7' : '#ccc',
                marginHorizontal: 5,
                marginTop: -20,
              }}
            />
          );
        })}
      </View>
    );
  };

  const ref = React.useRef(null);

  const onPressPagination = index => {
    setNumber(index);
    ref.current?.scrollTo({
      index, // Scroll to the specific index
      animated: true,
    });
  };

  const defaultDataWith6Colors = [
    '#B0604D',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
  ];

  const groupedData = groupData(defaultDataWith6Colors, 4); // Group data into chunks of 4

  return (
    <View style={styles.container}>
      <View style={styles.animatedContainer9}>
        <Text
          style={{
            fontSize: 32,
            color: '#000',
            fontFamily: typography.boldPoppins,
            marginTop: 10,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: '#4894FE',
            fontFamily: typography.primary,
            marginTop: -10,
          }}>
          PS <Text style={{fontFamily: typography.italic}}>ENGG</Text>
        </Text>
      </View>
      <View style={{width: '100%', paddingLeft: 20, paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 18,
            color: '#333333',
            fontFamily: typography.primary,
          }}>
          Quick Create
        </Text>
      </View>

      <View style={styles.animatedContainer}>
        <Carousel
          ref={ref}
          {...baseOptions}
          loop
          onProgressChange={(_, absoluteProgress) =>
            (progress.value = absoluteProgress)
          }
          onSnapToItem={index => setNumber(index)}
          width={PAGE_WIDTH} // Full width of the carousel container
          style={{width: PAGE_WIDTH, justifyContent: 'center'}} // Center the carousel
          pagingEnabled={true} // Disable snapping to a single item
          data={groupedData}
          renderItem={renderItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.75,
          }}
        />
        <CustomPagination
          data={groupedData}
          progress={progress}
          onPressPagination={onPressPagination}
        />
      </View>

      <View style={{width: '100%', paddingLeft: 20, paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 18,
            color: '#333333',
            fontFamily: typography.primary,
          }}>
          Annual Information
        </Text>
      </View>
      <View style={styles.animatedContainer6}>
        <Chart />
      </View>

      <View style={styles.animatedContainer8}>
        <View style={{width: '100%', paddingLeft: 20, paddingBottom: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: '#333333',
              fontFamily: typography.primary,
            }}>
            Summary
          </Text>
        </View>
        <View style={{padding:15,backgroundColor:'#fff'}}>
          <View style={styles.summaryContainer}>
          <View style={styles.animatedContainer4}>
            <Text
              style={{
                color: '#000',
                fontSize: 30,
                fontFamily: typography.boldPoppins,
              }}>
              12
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: -10,
                fontFamily: typography.primary,
              }}>
              Units <Icon name="arrow-up" color="#27AE60" size={15} />{' '}
            </Text>
          </View>
            <Divider orientation="vertical" width={1} />
          <View style={styles.animatedContainer4}>
            <Text
              style={{
                color: '#000',
                fontSize: 30,
                fontFamily: typography.boldPoppins,
              }}>
              2000
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: -10,
                fontFamily: typography.primary,
              }}>
              KES <Icon name="arrow-down" color="#E63956" size={15} />
            </Text>
          </View>
          </View>
        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainer: {
    height: 160,
    padding: 10,
    paddingLeft:-10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 8, // For Android shadow
    width: PAGE_WIDTH, // Ensure it matches the PAGE_WIDTH
  },
  animatedContainer6: {
    height: 320, // Fixed height for container
    backgroundColor: '#fff',
    shadowColor: '#000', // Shadow for Android/iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // For Android shadow
  },
  animatedContainer9: {
    width: '90%',
    height: 80, // Fixed height for container
    marginVertical: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  animatedContainer8: {
    width: '100%',
    height: 170, // Fixed height for container
    marginVertical: 15,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    display: 'flex',
    alignItems: 'center',
  },
  animatedContainer2: {
    width: 74, // Adjust the width of each item
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25A7F7',
    borderRadius: 5,
  },
  animatedContainer4: {
    width: '50%',
    height: 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center', // Center items
  },
  animatedContainer3: {
    width: 78, // Adjust the width of each item
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7, // Add spacing between elements
  },

  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the two summary sections
  },
});
