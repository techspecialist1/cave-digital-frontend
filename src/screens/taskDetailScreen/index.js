import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTaskById, editTaskById } from '../../redux/taskSlice';

const TaskDetailScreen = (props) => {
  const dispatch = useDispatch();

  const { navigation } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState('');
  const [token, setToken] = useState('');
  const [deleted, setDeleted] = useState('');

  const { status, error, tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status == 'succeeded') {
      if (tasks?.message === 'Task has been updated') {
        Toast.show({ description: tasks?.message });
      } else if (deleted) {
        Toast.show({ description: 'Task deleted Successfully' });
        setDeleted(false);
        setTitle('');
        setDescription('');
      }
    }
  }, [status, tasks]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        return token;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const fetchTaskById = async () => {
    const token = await getToken();
    const id = props?.route?.params?.task?._id;

    dispatch(getTaskById({ id, token }));
  };

  const editTask = async () => {
    const data = {
      title: title,
      description: description,
    };
    const JWTToken = await getToken();
    const taskId = props?.route?.params?.task?._id;

    dispatch(editTaskById({ taskId, task: data, token: JWTToken }));
  };

  const deleteSelectedTask = async () => {
    const JWTToken = await getToken();

    setDeleted(true);

    dispatch(deleteTask({ taskId, token: JWTToken }));
  };

  useEffect(() => {
    setTaskId(props?.route?.params?.task?._id);

    setTitle(props?.route?.params?.task?.title);
    setDescription(props?.route?.params?.task?.description);
    fetchTaskById();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE_COLOR }}>
      <HeaderComponent
        title={'Task Detail'}
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
                          label={'Edit'}
                          onPress={() => editTask()}
                        />
                        <RoundedPrimaryButton
                          label={'Delete'}
                          onPress={() => deleteSelectedTask()}
                          buttonStyle={{ marginLeft: 10 }}
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

export default TaskDetailScreen;
