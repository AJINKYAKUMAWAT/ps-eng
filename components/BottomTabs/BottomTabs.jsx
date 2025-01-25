import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, StyleSheet} from 'react-native';
import { HomeScreen } from '../../screens/Home/Homescreen';
import InvoiceList from '../../screens/Invoice/InvoiceList';
import AddInvoice from '../../screens/Invoice/AddInvoice';
import AddLineItem from '../../screens/Invoice/AddSaleInvoice';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'clock-outline';
          } else if (route.name === 'PS Eng') {
            iconName = 'PS Eng';
          }

          return (
            <>
              {iconName === 'PS Eng' ? (
                <Image
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/e64d/4d58/b2560587e5fc7809c455300a88632ea6?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dSUCONtE7jXmP82eSiOI9j-iLa5y2UsUhZu9WlOHRrARcFEJSfUp~I3no1cUOzVzllNwwNgiJ-FOOBeHjGfVmVOxARr1mBFF09TMfvWIDx44mTlWvmozZ8iPSq-3WLJ6XbrkML1H8K9~lP0jcxeUsh1AmNlbgVUTb0aq6tdXhuJAzLQYyU~YP-ywl8630qTJOsa3l4GgRGZEY~m7dxqHYFxXac7elGc78ofP06iAQapbngsAykvNyRc7C6xcML~rpNL2ishEwC39mcuw30gRUZpOLtvAtcNmcL3TmvptI-15tjF1NcShm1YEgpUEYRtEbfPAIoFQxHBzyngv15TL0g__',
                  }}
                  style={[
                    styles.iconImage,
                    {tintColor: color}, // Apply tintColor dynamically
                  ]}
                />
              ) : (
                <Icon name={iconName} size={size} color={color} />
              )}
            </>
          );
        },
        tabBarActiveTintColor: '#007AFF', // Active icon color
        tabBarInactiveTintColor: '#8e8e93', // Inactive icon color
      })}>
      <Tab.Screen
        name="Home"
        options={{
          title:()=>false,
          header: () => false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title:()=>false,
          header: () => false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="PS Eng"
        options={{
          title:()=>false,
          header: () => false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Sales Invoice"
        options={{
          title:()=>false,
          header: () => false,
        }}
        component={AddLineItem}
      />
       <Tab.Screen
        name="InvoiceList"
        options={{
          title:()=>false,
          header: () => true,
        }}
        component={InvoiceList}
      />
       {/* <Tab.Screen
        name="InvoiceList"
        options={{
          title:()=>false,
          header: () => true,
        }}
        component={InvoiceList}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 25, // Adjust size
    height: 25,
    resizeMode: 'contain',
  },
});

export default MyTabs;
