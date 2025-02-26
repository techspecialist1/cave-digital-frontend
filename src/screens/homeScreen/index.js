import { WHITE_COLOR } from '@/src/utils/color';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'native-base';
import HeaderComponent from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTasks } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

const HomeScreen = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const { navigation } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [JWTToken, setJWTToken] = useState('');

  const { status, error, tasks } = useSelector((state) => state.tasks);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.error('Error removing token', e);
    }
  };

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
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

  const fetchAllTasks = async () => {
    const token = await getToken();

    setJWTToken(token);

    dispatch(getAllTasks(token));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchAllTasks();
      setRefreshing(false);
    }, 2000);
  };

  const showTaskDetail = (item) => {
    navigation.navigate('TaskDetailScreen', { task: item });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (tasks?.data?.length > 0) {
      setData(tasks.data);
    }
  }, [tasks]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => showTaskDetail(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  const emptyComponent = ({ item }) => (
    <View style={styles.emptyListStyle}>
      <Text style={styles.title}> No Data Found</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: WHITE_COLOR, flex: 1 }}>
      <HeaderComponent
        showLogoutButton={true}
        onLogoutPress={() => handleLogout()}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // contentContainerStyle={styles.container}
          ListEmptyComponent={emptyComponent}
        />
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('AddNewTask', { token: JWTToken })}
        >
          <Text style={styles.buttonText}>Add New Task</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
