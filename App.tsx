import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Provider as PaperProvider, Avatar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from './assets/image/logo.png';
import {Searchbar} from 'react-native-paper';
import Reanimated from './screens/Reanimated';
import About from './screens/About';
import EmojiPickerComponent from './components/EmojiPicker';
import PhoneCall from './screens/PhoneCall';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Avatar.Image size={40} source={{uri: 'https://picsum.photos/700'}} />
        </TouchableOpacity>
        <Title style={styles.drawerHeaderText}>Ajinkya Kumawat</Title>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function SearchbarComponent() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.headerContainer}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Reanimated />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={({navigation}) => ({
          headerLeft: () => false,
          drawerPosition: 'right',
          headerStyle: {
            backgroundColor: '#F3F3F2',
          },
          headerTitle: () => <Text style={styles.headerTitle}>Hello</Text>,
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Avatar.Icon
                  size={40}
                  icon="magnify"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Avatar.Icon
                  size={40}
                  icon="bell"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Avatar.Image
                  size={40}
                  source={{uri: 'https://picsum.photos/700'}}
                  style={styles.headerAvatar}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
        
        >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={styles.logoContainer}>
                <Avatar.Image
                  size={40}
                  source={logo}
                  style={styles.logo}
                />
              </View>
            ),
          }}
          
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            headerTitle: () => <Text>Helo</Text>,
            drawerIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen name="Emoji" component={EmojiPickerComponent} />
        <Drawer.Screen name="Call" component={PhoneCall} />
      </Drawer.Navigator>
    </NavigationContainer>
  </PaperProvider>
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
