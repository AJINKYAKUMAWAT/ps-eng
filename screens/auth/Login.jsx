import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../../AtomicComponents/Input';
import {useNavigation} from '@react-navigation/native';
import Button from '../../AtomicComponents/Button';
import {useToast} from 'react-native-toast-notifications';
import {Loader} from '../../AtomicComponents/Loader.jsx';
import {typography} from '../../theme/typography.jsx';
import Header from '../../AtomicComponents/Header.jsx';
import InputWithIcon from '../../AtomicComponents/InputWithIcon.jsx';

const LoginScreeen = () => {
  const [otpLoader, setOtpLoader] = useState(false);
  const [loginObj, setLoginObj] = useState({
    username: '',
    password: '',
  });
  const [passwordHide,setPasswordHide] = useState(true)
  const toast = useToast();

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validation, setValidation] = useState({
    phoneNumberError: ' ',
    passwordError: ' ',
  });

  const handleSignInOtp = e => {
    setOtpLoader(true);
    e.preventDefault();

    // const toastId = toast.show("success", {
    //   data: {
    //     type: 'success',
    //     message: `OTP sent successfully`,
    //     placement: 'top',
    //     duration: 4000,
    //     animationType: 'slide-in',
    //   }
    // });
    // if (toastId == toastId) {
    //   toast.hideAll();
    // }
    navigation.navigate('OtpScreens', {
      phoneNumber,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Header ImageHeadingComponent={''} />
        <View>
          <View style={{marginTop: 16}}>
            <Text style={styles.heading}>Sign in</Text>
            <Text style={styles.foregroundText}>
              Sign in with your mobile no.
            </Text>
          </View>
        </View>

        <View style={styles.formConatiner}>        
          <InputWithIcon
            placeholder="Name"
            iconName="account"
            value={loginObj.username}
            keyboardType="default" // Use "default" for text input
            onChangeText={text => setLoginObj({...loginObj, username: text})}
          />
          <InputWithIcon
            placeholder="Password"
            iconName="lock"
            value={loginObj.password}
            keyboardType={passwordHide ? "password" : "default"} // Use "default" for text input
            onChangeText={text => setLoginObj({...loginObj, password: text})}
            passwordVisible='eye-outline'
            passwordUnVisible="eye-off-outline"
            passwordHide={passwordHide}
            passwordIconClick={setPasswordHide}
          />
          <View style={styles.buttonContainer}>
            <Button
              asTouchable
              title="Sign In via OTP"
              style={styles.signInOtpBtn}
              onPress={handleSignInOtp}>
              {otpLoader ? (
                <Loader size={'small'} />
              ) : (
                <Text style={styles.signInOtpText}>Sign in</Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreeen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  // LoginForm
  formConatiner: {
    marginVertical: 16,
  },
  inputFieldContainer: {
    marginBottom: 16,
    gap: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    gap: 8,
  },
  signInBtn: {
    backgroundColor: '#213578',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 48,
  },
  loadingButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#213578',
    height: 48,
  },
  signInOtpBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: typography.bold,
    height: 48,
  },
  signInOtpText: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#fff',
    fontFamily: typography.bold,
  },
  foregroundText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    opacity: 0.5,
    fontFamily: typography.primary,
  },
  heading: {
    fontSize: 24,
    // fontWeight: '700',
    color: '#000',
    fontFamily: typography.bold,
  },
});
