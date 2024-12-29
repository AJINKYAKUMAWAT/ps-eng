import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import DropdownComponent from '../common/Dropdown';
import {typography} from '../../theme/typography';
import Carousel from 'react-native-reanimated-carousel';
import { generateYAxisLabels, PAGE_WIDTH } from '../../utils/utils';


const data = [
  {label: '2022', value: '2022'},
  {label: '2021', value: '2021'},
  {label: '2020', value: '2020'},
  {label: '2019', value: '2019'},
];

const labelData = [
 10,20,30,40
];

const ChartWithSwiper = () => {
  const ref = useRef(null);

  
  const dataSets = [
    {
      data: [10, 25, 18, 30, 40, 35],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    {
      data: [45, 50, 38, 32, 27, 20],
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const renderChart = ({item}) => {
    const maxValue = Math.max(...item.data);
    const yAxisLabels = generateYAxisLabels(maxValue);
    return (
      <LineChart
      style={{zIndex:1}}
        data={{
          datasets: [
            {
              data: item.data, // Data for the y-axis
              strokeWidth: 4, // Line thickness
            },
          ],
        }}
        width={400} // Adjust width to fit screen
        yAxisSuffix="k"
        height={170}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // Display integer values
          color: () => '#9d4ef1', // Use gradient color
          labelColor: () => '#000',
          propsForBackgroundLines: {
            display: 'none', // Hide background grid lines
          },
          yAxisSuffix: 'k', // Add a suffix like 'k' to Y-axis labels
          yAxisInterval: 1, // Interval for Y-axis labels
          yAxisLabels: yAxisLabels, // Custom Y-axis labels
          style: {
            labels: {
              fontFamily: typography.primary, // Set the font family for x-axis labels
              fontSize: 12,
              fontWeight: 'normal',
              color: '#000',
            },
          },
        }}
        withDots={false} // Disable dots
      />
    );
  };

  const CustomPagination = ({data}) => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => ref.current?.scrollTo({index, animated: true})}
            style={{
              width: activeIndex === index ? 20 : 10,
              height: 7,
              borderRadius: 5,
              backgroundColor: activeIndex === index ? '#25A7F7' : '#ccc',
              marginHorizontal: 5,
              marginTop:20
            }}
           
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          zIndex: 1,
         
        }}>
        <Text style={styles.title}>Monthly Sales</Text>
        <Text style={[styles.title2]}>
          <DropdownComponent data={data} />
        </Text>
      </View>
      <Carousel
        ref={ref}
        data={dataSets}
        renderItem={renderChart}
        width={PAGE_WIDTH}
        height={220}
        loop={false}
        onSnapToItem={setActiveIndex}
      />
      <CustomPagination data={dataSets} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
    paddingLeft: 20,
    fontFamily: typography.primary,
      
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'right',
    paddingRight: 20,
  },
});

export default ChartWithSwiper;
