import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  VStack,
  Flex,
  Box,
  Heading,
  FormControl,
  KeyboardAvoidingView,
  Stack,
  ScrollView,
  Text,
  View,
  Pressable,
  Toast,
} from 'native-base';

import styles from './styles';
import InputField from '../../components/inputField';
import RoundedPrimaryButton from '../../components/button';
import { REDISH_ORANGE, SILVER_COLOR, WHITE_COLOR } from '../../utils/color';
import { ms } from '../../utils/deviceConfig';
import { login } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const { status, error, user } = useSelector((state) => state.auth);

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (e) {
      console.error('Error saving token', e);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        setEmail('');
        setPassword('');

        navigation.navigate('Home');

        return token;
      }
      return null;
    } catch (e) {
      console.error('Error getting token', e);
      return null;
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (status == 'succeeded') {
      Toast.show({ description: 'LoggedIn Successfully' });
      saveToken(user.data.accessToken);
      navigation.navigate('Home');
    } else {
      if (error) {
        Toast.show({ description: error });
      }
    }
  }, [status, user]);

  const loginUser = async () => {
    if (email !== '' && password !== '') {
      const userData = {
        email: email,
        password: password,
      };
      setErrorText('');

      dispatch(login(userData));
    } else {
      setErrorText('All fields are required');
    }
  };

  const openSignupScreen = async () => {
    navigation.navigate('Signup');
  };

  return (
    <View
      flex={1}
      justifyContent={'center'}
      alignContent={'center'}
      backgroundColor={WHITE_COLOR}
      paddingX={ms(32)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardViewCss}
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.scrollViewContainerCss}
          style={styles.scrollViewCss}
        >
          <Flex
            dir="column"
            justifyContent="space-between"
            backgroundColor={REDISH_ORANGE}
            h="100%"
          >
            <VStack
              flex={1}
              justifyContent={'center'}
              backgroundColor={WHITE_COLOR}
            >
              <Box>
                <Heading textAlign={'center'}>{'Welcome'}</Heading>
                <Stack mt={10}>
                  <Box>
                    <FormControl.Label>{'Email'}</FormControl.Label>

                    <InputField
                      _focus={{
                        backgroundColor: SILVER_COLOR,
                        borderWidt: 1,
                      }}
                      borderWidth={0}
                      type="email"
                      autoCapitalize="none"
                      mt={2}
                      mb={5}
                      height={50}
                      fontSize={16}
                      backgroundColor={SILVER_COLOR}
                      variant="outline"
                      placeholder="joe@vyakta.com"
                      value={email}
                      onChangeText={(value) => setEmail(value.trim())}
                      autoFocus={true}
                      focusBorderColor="transparent"
                    />
                  </Box>
                  <Box>
                    <FormControl.Label>{'Password'}</FormControl.Label>
                    <InputField
                      type="password"
                      _focus={{
                        backgroundColor: SILVER_COLOR,
                        borderWidt: 1,
                      }}
                      borderWidth={0}
                      mt={2}
                      mb={5}
                      height={50}
                      fontSize={16}
                      variant="outline"
                      placeholder="*********"
                      backgroundColor={SILVER_COLOR}
                      focusBorderColor="transparent"
                      outlineWidth={0}
                      value={password}
                      secureText
                      onChangeText={(value) => setPassword(value.trim())}
                    />
                    <RoundedPrimaryButton
                      label={'login'}
                      onPress={() => loginUser()}
                    />
                    <Text style={styles.errorText}>{errorText}</Text>
                  </Box>
                  <Pressable style={styles.resetBtnCss}>
                    <Text style={styles.resetTextCss}>Reset Password</Text>
                  </Pressable>

                  <Pressable
                    style={styles.signUpTochableBtn}
                    onPress={() => openSignupScreen()}
                  >
                    <Text style={styles.signUpTxtbtn}>SignUp</Text>
                  </Pressable>
                </Stack>
              </Box>
            </VStack>
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
