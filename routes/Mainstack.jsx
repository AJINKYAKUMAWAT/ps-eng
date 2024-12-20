import React, { useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Provider as PaperProvider, Avatar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutUs from '../components/AboutUs/AboutUs';
import { ContactUs } from '../components/ContactUs/ContactUs';
import MyTabs from '../components/BottomTabs/BottomTabs';
import AuthContext from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();


function LogoutScreen() {
  const { setIsLoggedIn,clearUserDetails } = useContext(AuthContext);

  useEffect(() => {
    const logout = () => {
      clearUserDetails();      // Update state to logout
    };

    logout();
  }, [ setIsLoggedIn]);

  return <View />; // Render an empty view
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Avatar.Image size={40} source={{uri: 'https://picsum.photos/700'}} />
        </TouchableOpacity>
        <Title style={styles.drawerHeaderText}>PS ENGG</Title>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Mainstack() {
  const {setIsLoggedIn} = useContext(AuthContext);
  
  return (
    
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          screenOptions={({navigation}) => ({
            swipeEnabled:false,
            headerStyle: {
              backgroundColor: '#F3F3F2',
            },
            headerTitle: () => <Text style={styles.headerTitle}>Hello</Text>,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity>
                <Icon name="bell-outline" size={24} color="#000"  style={styles.customIcon}/>
                </TouchableOpacity>
              </View>
            ),
          })}>
          <Drawer.Screen
            name="Dashboard"
            component={MyTabs}
            options={{
              headerTitleAlign:'center',
              headerTitle: () => <Text style={{color:'#000',fontSize:20}}>Dashboard</Text>,
              drawerIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            options={{
              headerTitle: () => <Text>Helo</Text>,
              drawerIcon: ({color, size}) => (
                <Icon name="book-open-outline" color={color} size={size} />
              ),
            }}
            name="About us"
            component={AboutUs}
          />
          <Drawer.Screen
            options={{
              headerTitle: () => <Text>Helo</Text>,
              drawerIcon: ({color, size}) => (
                <Icon name="phone" color={color} size={size} />
              ),
            }}
            name="Contact Us"
            component={ContactUs}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({color, size}) => (
                <Icon name="logout" color={color} size={size} />
              ),
            }}
            name="Logout"
            component={LogoutScreen}
          />
        </Drawer.Navigator>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#f8f8f8',
  },
  customIcon: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
    borderRadius: 20, // Optional: for a rounded image
    marginRight: 10, // Maintain spacing
  },
  searchbar: {
    width: 250,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
    backgroundColor: '#D1D1CC',
  },
  headerAvatar: {
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: '#D1D1CC',
    borderWidth: 1,
  },
});
