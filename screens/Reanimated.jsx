/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Reanimated() {
  return (
    <View style={styles.container}>
       <View style={styles.animatedContainer9}>
        <Text style={{fontSize: 32, color: '#000',fontWeight:500}}>Welcome</Text>
        <Text style={{fontSize: 30, color: '#4894FE'}}>PS <Text style={{fontStyle:'italic'}}>ENGG</Text></Text>        
      </View>
      <View style={styles.animatedContainer}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
          {Array.from({length: 9}).map((_, index) => (
            <View key={index} style={styles.animatedContainer3}>
              <View key={index} style={styles.animatedContainer2}>
                <Text style={{color: '#000'}}><Icon name="file-plus-outline" color="#fff" size={30}/></Text>
              </View>
              <Text style={{color: '#000',textAlign:'center',padding:2,fontWeight:500}}>Sole Invoice {index + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.animatedContainer6}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <AnimatedCircularProgress
            size={60}
            width={5}
            rotation={0}
            fill={60}
            tintColor="#00e0ff"
            backgroundColor="#ffffff">
            {fill => <Text style={{color: '#000'}}>60%</Text>}
          </AnimatedCircularProgress>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontWeight: 700}}>Meter:M22303NG</Text>
            <Text style={{color: '#000'}}>Reading:223.4 M3</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 10,
          }}>
          <Text style={{color: '#000', fontWeight: 700}}>
            Your water usage is 11% more
          </Text>
          <Text style={{color: '#000'}}>then your previous month!</Text>
        </View>
      </View>
      <View style={styles.animatedContainer8}>
        <Text style={{fontSize: 20, color: 'grey'}}>Summary</Text>
        <View style={{display: 'flex', flexDirection: 'row',marginTop:20}}>
          <View style={styles.animatedContainer4}>
            <Text style={{color: '#000',fontSize:20,fontWeight:700}}>12</Text>
            <Text style={{color: '#000',fontSize:16}}>Units  <Icon name="arrow-up" color="#27AE60" size={15} />            </Text>
          </View>
          <View style={styles.animatedContainer4}>
            <Text style={{color: '#000',fontSize:20,fontWeight:700}}>2000</Text>
            <Text style={{color: '#000',fontSize:16}}>KES  <Icon name="arrow-down" color="#E63956" size={15}/></Text>
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
    width: '90%',
    height: 170, // Fixed height for container
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,    
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 8, // For Android shadow
  },
  animatedContainer6: {
    width: '90%',
    height: 170, // Fixed height for container
    padding: 25,
    borderRadius: 10,
    backgroundColor: '#78c5f5',
    shadowColor: '#000', // Shadow for Android/iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // For Android shadow
  },
  animatedContainer9: {
    width: '90%',
    height: 170, // Fixed height for container
    borderRadius: 10,
    padding: 25,
    marginVertical: 20,
    backgroundColor: '#78c5f5',
    shadowColor: '#000', // Shadow for Android/iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // For Android shadow
  },
  animatedContainer9: {
    width: '90%',
    height: 80, // Fixed height for container
    marginVertical:15,
    display:'flex',
    justifyContent:'center'
  },
  animatedContainer8: {
    width: '90%',
    height: 170, // Fixed height for container
    marginVertical:15
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    display: 'flex',
    alignItems: 'center',
  },
  animatedContainer2: {
    width: 64, // Adjust the width of each item
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#25A7F7',
    borderRadius: 5,
  },
  animatedContainer4: {
    width: '48%', // Adjust the width of each item
    height: 100,
    padding:25,
    borderRadius: 5,
    backgroundColor:'#A3C9FE',    
    marginHorizontal: 5, // Add spacing between elements
  },
  animatedContainer3: {
    width: 64, // Adjust the width of each item
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7, // Add spacing between elements
  },
});
