import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import {
  VStack,
  Flex,
  Box,
  FormControl,
  KeyboardAvoidingView,
  Stack,
  ScrollView,
  View,
  Toast,
} from 'native-base';

import styles from './styles';
import InputField from '../../components/inputField';
import RoundedPrimaryButton from '../../components/button';
import { REDISH_ORANGE, SILVER_COLOR, WHITE_COLOR } from '../../utils/color';
import { ms } from '../../utils/deviceConfig';
import HeaderComponent from '@/src/components/header';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewTask = (props) => {
  // console.log('JWT token add new taskk screen', props.route.params.token);
  const { navigation } = props;

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        console.log('Token add new task retrieved:', token);
        return token;
      }
      console.log('No token found add new task');
      return null;
    } catch (e) {
      console.error('Error getting token add new task', e);
      return null;
    }
  };

  const { status, error, tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status == 'succeeded') {
      Toast.show({ description: 'New task added Successfully' });
      setTitle('');
      setDescription('');
    }
  }, [status, tasks]);

  const addNewTask = async () => {
    const task = {
      title: title,
      description: description,
    };

    const token = await getToken();

    console.log('TT01 addNewTask function calling');

    console.log('siggnup function calling', token);

    dispatch(addTask({ task, token }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE_COLOR }}>
      <HeaderComponent
        title={'New Task'}
        onBackPress={() => handleGoBack()}
        showBackIcon={true}
      />
      <View
        flex={1}
        justifyContent={'center'}
        alignContent={'center'}
        backgroundColor={WHITE_COLOR}
        paddingX={ms(12)}
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
                  <Stack mt={10}>
                    <Box>
                      <FormControl.Label>{'Title'}</FormControl.Label>

                      <InputField
                        _focus={{
                          backgroundColor: SILVER_COLOR,
                          borderWidt: 1,
                        }}
                        borderWidth={0}
                        autoCapitalize="none"
                        mt={2}
                        mb={5}
                        height={50}
                        fontSize={16}
                        backgroundColor={SILVER_COLOR}
                        variant="outline"
                        placeholder="Please Enter Task Title"
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        autoFocus={true}
                        focusBorderColor="transparent"
                      />
                    </Box>
                    <Box>
                      <FormControl.Label>{'Description'}</FormControl.Label>
                      <InputField
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
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                      />
                      <Box style={{ flexDirection: 'row' }}>
                        <RoundedPrimaryButton
                          label={'Add Task'}
                          onPress={() => addNewTask()}
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
    </SafeAreaView>
  );
};

export default AddNewTask;
