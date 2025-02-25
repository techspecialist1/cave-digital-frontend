import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Image,
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
} from 'native-base';

import styles from './styles';
import InputField from '../../components/inputField';
import RoundedPrimaryButton from '../../components/button';
import { REDISH_ORANGE, SILVER_COLOR, WHITE_COLOR } from '../../utils/color';
import { ms } from '../../utils/deviceConfig';

const TaskDetailScreen = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log('login  function calling');
    navigation.navigate('Home');
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
              // borderTopLeftRadius={20}
            >
              <Box>
                {/* <Heading textAlign={'center'}>{'Welcome'}</Heading> */}
                <Stack mt={10}>
                  <Box>
                    <FormControl.Label>{'Title'}</FormControl.Label>

                    <InputField
                      _focus={{
                        backgroundColor: SILVER_COLOR,
                        borderWidt: 1,
                      }}
                      borderWidth={0}
                      // type="email"
                      autoCapitalize="none"
                      mt={2}
                      mb={5}
                      height={50}
                      fontSize={16}
                      backgroundColor={SILVER_COLOR}
                      variant="outline"
                      placeholder="Please Enter Task Title"
                      value={email}
                      onChangeText={(value) => setEmail(value.trim())}
                      autoFocus={true}
                      focusBorderColor="transparent"
                    />
                  </Box>
                  <Box>
                    <FormControl.Label>{'Description'}</FormControl.Label>
                    <InputField
                      // type="text"
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
                      placeholder="Please Enter Task Description"
                      backgroundColor={SILVER_COLOR}
                      focusBorderColor="transparent"
                      outlineWidth={0}
                      value={password}
                      onChangeText={(value) => setPassword(value.trim())}
                    />
                    <Box style={{ flexDirection: 'row' }}>
                      <RoundedPrimaryButton
                        label={'Edit'}
                        // btnDisable={!valueIsEmpty(email, password)}
                        // disabled={!valueIsEmpty(email, password)}
                        onPress={() => login()}
                      />
                      <RoundedPrimaryButton
                        label={'Delete'}
                        // btnDisable={!valueIsEmpty(email, password)}
                        // disabled={!valueIsEmpty(email, password)}
                        onPress={() => login()}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </VStack>
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskDetailScreen;
