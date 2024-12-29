import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Button from '../../AtomicComponents/Button';
import {useToast} from 'react-native-toast-notifications';
import {Loader} from '../../AtomicComponents/Loader.jsx';
import {typography} from '../../theme/typography.jsx';
import InputWithIcon from '../../AtomicComponents/InputWithIcon.jsx';
import ps_logo from '../../assets/image/ps_engineering.png';
import login_logo from '../../assets/image/login_logo.png';
import CheckBox from '@react-native-community/checkbox';
import {API_ENDPOINT, axiosPrivate} from '../../utils/constant.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthProvider.jsx';
import { palette } from '../../theme/palette.jsx';

const LoginScreeen = () => {
  const {auth, setIsLoggedIn,setAuth} = useContext(AuthContext);

  const [loader, setLoader] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [loginObj, setLoginObj] = useState({
    username: '',
    password:'',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (auth.remember === 'true') {
      setLoginObj({
        username: auth.username, // Populate from auth when available
        password: auth.password,
      });
      setSelection(true)
    }
  }, [auth]);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      userName: loginObj.username,
      password: loginObj.password,
      xAction: 'generateToken',
    };

    if (!(loginObj.username || loginObj.password)) {
      setErrorMessage('This field is required');
    } else {
      setLoader(true);
      axiosPrivate
        .post(
          API_ENDPOINT.LOGIN,
          {}, // Empty body since you're sending data in headers
          {
            headers: payload,
          },
        )
        .then(async res => {
          const userdetails = {            
            username:loginObj.username,
            password:loginObj.password,
            remember:isSelected ? 'true' : 'false'
          }
          await AsyncStorage.setItem('user', JSON.stringify({...userdetails,userId:res?.data?.data?.userID,}));
          await AsyncStorage.setItem('token', res?.data?.data?.apiToken);
          setAuth(userdetails);
         
          setIsLoggedIn(true);
          setLoader(false);
          if (res) {
            toast.show('Login Successfull', {
              data: {
                type: 'success',
                message: 'Login Successfully',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
              },
            });
          }
        })
        .catch(err => {
          setLoader(false);
          toast.show(err, {
            data: {
              type: 'Failed',
              message: err.response?.data?.message || 'Invalid User',
              placement: 'top',
              duration: 4000,
              animationType: 'slide-in',
            },
          });
        });
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.ps_text}>
          <Image source={ps_logo} />
        </View>
         <View style={{marginTop: -10,marginBottom: 10, width: '100%'}}>
          <Text style={styles.heading}>Log in</Text>
        </View>
        <View style={styles.ps_logo}>
          <Image source={login_logo} />
        </View>      

        <View style={styles.formConatiner}>
          <InputWithIcon
            placeholder="Name"
            iconName="account-outline"
            value={loginObj.username}
            placeholderTextColor='#A8A8A8'
            keyboardType="default" // Use "default" for text input
            onChangeText={text => setLoginObj({...loginObj, username: text})}
            errorMessage={errorMessage}
          />
          <InputWithIcon
            placeholder="Password"
            iconName="lock-outline"
            value={loginObj.password}
            keyboardType={passwordHide ? 'password' : 'default'} // Use "default" for text input
            onChangeText={text => setLoginObj({...loginObj, password: text})}
            passwordVisible="eye-outline"
            passwordUnVisible="eye-off-outline"
            placeholderTextColor='#A8A8A8'
            passwordHide={passwordHide}
            passwordIconClick={setPasswordHide}
            errorMessage={errorMessage}
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
              title="Log In"
              disabled={loader}
              style={styles.signInOtpBtn}
              onPress={handleSubmit}>
              {loader ? (
                <View style={{display:'flex',flexDirection:'row',gap:2}}>
                <Loader size={'small'} color={palette.white}/><Text style={styles.signInOtpText}>Log in</Text>
                </View>
              ) : (
                <Text style={styles.signInOtpText}>Log in</Text>
              )}
            </Button>
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.heading3}>Forgot Password?</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreeen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5, // Space between checkbox and text
    alignSelf: 'center', // Align it vertically
    borderWidth: 1, // Optional: border for a custom look
    borderColor: '#213578', // Border color to match the theme
    borderRadius: 4, // Optional: rounded corners for the checkbox
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
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
    backgroundColor:'#4894FE'
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
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    fontFamily: typography.primary,
    textAlign: 'center',
  },
  heading2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BDBDBD',
    fontFamily: typography.primary,
    textAlign: 'center',
    marginTop:4
  },
  heading3: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0F3656',
    fontFamily: typography.primary,
    textAlign: 'center',
  },
  ps_logo: {
    padding: 15,
  },
  ps_text: {
    padding: 15,
    marginLeft:28
  },
});
