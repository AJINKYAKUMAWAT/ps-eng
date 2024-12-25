import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useIsFocused, useScrollToTop } from '@react-navigation/native';
import Dashboard from '../Dashboard';

export function HomeScreen() {
    const ref = React.useRef(null);
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused && ref.current) {
        ref.current.scrollTo({ y: 0, animated: true });
      }
    }, [isFocused]);
    
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} ref={ref}>
          <Dashboard />
        </ScrollView>
      </SafeAreaView>
    );
  };

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