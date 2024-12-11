import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../../AtomicComponents/Input';
import {useNavigation} from '@react-navigation/native';
import Button from '../../AtomicComponents/Button';
import {useToast} from 'react-native-toast-notifications';
import {Loader} from '../../AtomicComponents/Loader.jsx';
import {typography} from '../../theme/typography.jsx';
import Header from '../../AtomicComponents/Header.jsx';
import InputWithIcon from '../../AtomicComponents/InputWithIcon.jsx';
import ps_logo from '../../assets/image/ps_engineering.png';
import login_logo from '../../assets/image/login_logo.png';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../redux/auth/auth-slice.jsx';
import { API_ENDPOINT, axiosPrivate } from '../../utils/constant.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreeen = () => {
  const [otpLoader, setOtpLoader] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [loginObj, setLoginObj] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch()
  const [passwordHide, setPasswordHide] = useState(true);
  const toast = useToast();

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validation, setValidation] = useState({
    phoneNumberError: ' ',
    passwordError: ' ',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      userName: loginObj.username,
      password: loginObj.password,
      xAction: 'generateToken',
    };
  
    axiosPrivate
      .post(
        API_ENDPOINT.LOGIN, 
        {}, // Empty body since you're sending data in headers
        {
          headers: {
            'Content-Type': 'application/json',
            source: 'mobile_application',
            'x-username': payload.userName, // Example header key for username
            'x-password': payload.password, // Example header key for password
            'x-action': payload.xAction, // Example header key for action
          },
        }
      )
      .then(async (res) => {
        if (res) {
          const toastId = toast.show('Login Successfull', {
            data: {
              type: 'success',
              message: 'Login Successfully',
              placement: 'top',
              duration: 4000,
              animationType: 'slide-in',
            },
          });
          if (toastId === toastId) {
            toast.hideAll();
          }
          setAuth(res?.data?.data?.token);
          await AsyncStorage.setItem('user', JSON.stringify(res?.data?.data));
          await AsyncStorage.setItem('token', JSON.stringify(res?.data?.data?.token));
        } else if (!res) {
          if (res?.data?.data?.msg === 'User is not registered.') {
            const toastId = toast.show(
              'Please use registered number or contact us on 020 - 67136236 / edukaansupport@tatamotors.com',
              {
                data: {
                  type: 'danger',
                  message:
                    'Please use registered number or contact us on 020-67136236 / edukaansupport@tatamotors.com',
                  placement: 'top',
                  duration: 4000,
                  animationType: 'slide-in',
                },
              }
            );
            if (toastId === toastId) {
              toast.hideAll();
            }
          } else if (res?.data?.data?.msg === 'Username or password do not match.') {
            const toastId = toast.show('Username or password do not match.', {
              data: {
                type: 'danger',
                message: 'Username or password do not match.',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
              },
            });
            if (toastId === toastId) {
              toast.hideAll();
            }
          } else {
            const toastId = toast.show(res?.data?.data?.msg, {
              data: {
                type: 'danger',
                message: `${res?.data?.data?.msg}`,
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
              },
            });
            if (toastId === toastId) {
              toast.hideAll();
            }
          }
          console.error('Login failed:', res?.data?.data?.msg);
        }
        setSignInLoader(false);
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST') {
          toast.show(err, {
            data: {
              type: 'Failed',
              message:
                'Your account has temporarily blocked due to multiple attempts to login using an incorrect password. Either login with OTP and change the password or try login in again with correct password after some time.',
              placement: 'top',
              duration: 4000,
              animationType: 'slide-in',
            },
          });
        }
        setSignInLoader(false);
        console.error('Error during login:', err);
        setTimeout(() => {
          setValidation({
            ...validation,
            phoneNumberError: '',
            passwordError: '',
          });
        }, 2000);
      });
  };
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.ps_logo}>

        <Image source={ps_logo} />
        </View>
        <View style={styles.ps_logo}>

        <Image source={login_logo}/>
        </View>
        <View style={{marginTop: 16, width: '100%'}}>
          <Text style={styles.heading}>Log in</Text>
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
            keyboardType={passwordHide ? 'password' : 'default'} // Use "default" for text input
            onChangeText={text => setLoginObj({...loginObj, password: text})}
            passwordVisible="eye-outline"
            passwordUnVisible="eye-off-outline"
            passwordHide={passwordHide}
            passwordIconClick={setPasswordHide}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected} // Set this to a state value to control the checkbox
              onValueChange={() => setSelection(prev => !prev)} // Replace with your handler
              style={styles.checkbox}
              tintColors={{true: '#213578', false: '#c4c4c4'}} // Colors for selected and unselected states
            />
            <Text style={styles.heading2}>Remember me?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              asTouchable
              title="Sign In via OTP"
              style={styles.signInOtpBtn}
              onPress={handleSubmit}>
              {otpLoader ? (
                <Loader size={'small'} />
              ) : (
                <Text style={styles.signInOtpText}>Sign in</Text>
              )}
            </Button>
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.heading2}>Forgot Password?</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom:10,
    alignItems:'center',
  },
  checkbox: {
    marginRight: 12, // Space between checkbox and text
    alignSelf: 'center', // Align it vertically
    borderWidth: 1, // Optional: border for a custom look
    borderColor: '#213578', // Border color to match the theme
    borderRadius: 4, // Optional: rounded corners for the checkbox
    transform: [{scaleX: 1.2}, {scaleY: 1.2}]
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
    fontWeight: '700',
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
    fontWeight: '700',
    color: '#000',
    fontFamily: typography.boldPoppins,
    textAlign: 'center',
  },
  heading2: {
    fontSize: 17,
    color: '#0F3656',
    fontWeight: '700',
    fontFamily: typography.boldPoppins,
    textAlign: 'center',
  },
  ps_logo:{
    padding:15,
   
  },

});
