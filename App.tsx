import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Provider as PaperProvider, Avatar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Reanimated from './screens/Reanimated';
import EmojiPickerComponent from './components/EmojiPicker';
import PhoneCall from './screens/PhoneCall';
import MyTabs from './components/BottomTabs/BottomTabs';
import AboutUs from './components/AboutUs/AboutUs';
import { ContactUs } from './components/ContactUs/ContactUs';
import { useScrollToTop } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
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

export function HomeScreen() {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} ref={ref}>
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
            headerStyle: {
              backgroundColor: '#F3F3F2',
            },
            headerTitle: () => <Text style={styles.headerTitle}>Hello</Text>,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/e64d/4d58/b2560587e5fc7809c455300a88632ea6?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dSUCONtE7jXmP82eSiOI9j-iLa5y2UsUhZu9WlOHRrARcFEJSfUp~I3no1cUOzVzllNwwNgiJ-FOOBeHjGfVmVOxARr1mBFF09TMfvWIDx44mTlWvmozZ8iPSq-3WLJ6XbrkML1H8K9~lP0jcxeUsh1AmNlbgVUTb0aq6tdXhuJAzLQYyU~YP-ywl8630qTJOsa3l4GgRGZEY~m7dxqHYFxXac7elGc78ofP06iAQapbngsAykvNyRc7C6xcML~rpNL2ishEwC39mcuw30gRUZpOLtvAtcNmcL3TmvptI-15tjF1NcShm1YEgpUEYRtEbfPAIoFQxHBzyngv15TL0g__',
                    }}
                    style={styles.customIcon}
                  />
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
