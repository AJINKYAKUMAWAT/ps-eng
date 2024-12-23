import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { typography } from '../theme/typography';

const InputWithIcon = ({
  label,
  value,
  placeholder,
  placeholderTextColor = '#747373',
  keyboardType = 'default',
  maxLength,
  onChangeText,
  iconName,
  passwordVisible,
  passwordUnVisible,
  passwordHide,
  passwordIconClick,
  errorMessage = '', // Add errorMessage prop with a default value
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, errorMessage && !value ? styles.errorBorder : null]}>
        <Icon name={iconName} size={24} color="#A8A8A8" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeText}
          secureTextEntry={passwordHide} // This will hide or show password based on passwordHide state
        />
        {/* Password toggle icon */}
        {passwordHide ? (
          <Icon 
            name={passwordUnVisible} 
            size={24} 
            color="#A8A8A8" 
            style={styles.icon} 
            onPress={() => passwordIconClick(false)} 
          />
        ) : (
          <Icon 
            name={passwordVisible} 
            size={24} 
            color="#A8A8A8" 
            style={styles.icon} 
            onPress={() => passwordIconClick(prev => !prev)} 
          />
        )}
      </View>
      {/* Conditionally render error message */}
      {errorMessage && !value ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12, // Add spacing between inputs
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#909090',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fdfcfc',
    height: 55,
  },
  errorBorder: {
    borderColor: '#f00', // Red border to indicate an error
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ADADAD',
    backgroundColor: '#fdfcfc',
    fontFamily:typography.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#f00', // Red text for errors
  },
});

export default InputWithIcon;
