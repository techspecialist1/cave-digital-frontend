import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/authSlice';

const SignUpScreen = (props) => {
  const dispatch = useDispatch();

  const { navigation } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const { status, error, user } = useSelector((state) => state.auth);

  const registerUser = async () => {
    if (name !== '' && email !== '' && password !== '') {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      setErrorText('');

      dispatch(signup(userData));
    } else {
      setErrorText('All fields are required');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (status == 'succeeded') {
      Toast.show({ description: 'You Registered Successfully' });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigation.navigate('Login');
    } else {
      Toast.show({ description: error });
    }
  }, [status, user]);

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
                <Heading textAlign={'center'}>{'Sign Up'}</Heading>
                <Stack mt={10}>
                  <Box>
                    <FormControl.Label>{'Name'}</FormControl.Label>

                    <InputField
                      _focus={{
                        backgroundColor: SILVER_COLOR,
                        borderWidt: 1,
                      }}
                      borderWidth={0}
                      type="text"
                      autoCapitalize="none"
                      mt={2}
                      mb={5}
                      height={50}
                      fontSize={16}
                      backgroundColor={SILVER_COLOR}
                      variant="outline"
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={(value) => setName(value)}
                      autoFocus={true}
                      focusBorderColor="transparent"
                    />
                  </Box>
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
                    <Box>
                      <FormControl.Label>
                        {'Confirm Password'}
                      </FormControl.Label>
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
                        value={confirmPassword}
                        secureText
                        onChangeText={(value) =>
                          setConfirmPassword(value.trim())
                        }
                      />
                    </Box>
                    <RoundedPrimaryButton
                      label={'Sign Up'}
                      onPress={() => registerUser()}
                    />
                    <Text style={styles.errorText}>{errorText}</Text>
                  </Box>

                  <Pressable
                    style={styles.signUpTochableBtn}
                    onPress={() => navigateToLogin()}
                  >
                    <Text style={styles.signUpTxtbtn}>
                      Already have an account?{' '}
                      <Text color={'#476abf'} style={styles.login}>
                        login
                      </Text>
                    </Text>
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

export default SignUpScreen;
