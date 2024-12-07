import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {typography} from '../theme/typography';

const Input = ({
  icon,
  hideIcon,
  inputType,
  direction = 'right',
  label,
  errorMessage,
  ...props
}) => {
  const [focused, setIsFocued] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const Icon = icon;
  const HideIcon = hideIcon; // Dynamic Icon generation *DO NOT REMOVE*

  const customOnFocused = () => {
    props?.onFocus;
    setIsFocued(true);
  };

  const customOnBlured = () => {
    props?.onBlur;
    setIsFocued(false);
  };

  const handlePress = () => {
    if (!inputType) {
      return;
    }

    setShowPassword(!showPassword);
  };

  return (
    <View style={{position: 'relative'}}>
      <View>
        <Text style={[styles.inputLabel, props.style]}>{label}</Text>
        <TextInput
          style={[
            styles.inputFieldConstant,
            props.style,
            errorMessage && styles.inpurtFieldError,
            focused ? styles.inputFieldFocused : styles.inputFieldBlured,
          ]}
          onFocus={customOnFocused}
          onBlur={customOnBlured}
          secureTextEntry={
            inputType === 'password' && showPassword ? true : false
          }
          {...props}
        />
        {errorMessage != undefined && (
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        )}
      </View>

      {direction && inputType && (
        <TouchableOpacity
          style={[direction == 'left' ? styles.iconLeft : styles.iconRight]}
          onPress={handlePress}>
          {showPassword ? <Icon /> : <HideIcon />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputLabel: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#949494',
    fontFamily: typography.primary,
  },
  iconRight: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginTop: '10%',
    left: 6,
  },
  iconLeft: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '10%',
    right: 6,
  },
  inputFieldConstant: {
    borderStyle: 'solid',
    position: 'relative',
    paddingLeft: 16,
    borderRadius: 8,
    color: '#1A1A1A',
    fontFamily: typography.primary,
  },
  inputFieldFocused: {
    borderWidth: 2,
    borderColor: '#02AFF0',
  },
  inputFieldBlured: {
    borderWidth: 1,
    borderColor: '#747373',
  },
  inpurtFieldError: {
    borderWidth: 2,
    borderColor: '#F04302',
  },
  errorMessageText: {
    color: '#F04302',
    fontSize: 12,
    fontWeight: '700',
  },
});
