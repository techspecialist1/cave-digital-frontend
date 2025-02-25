import { SECOUNDRY_COLOR, WHITE_COLOR } from '@/src/utils/color';
import { ms } from '@/src/utils/deviceConfig';
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  HStack,
  IconButton,
  Box,
} from 'native-base';

const HomeScreen = (props) => {
  const [data, setData] = useState([
    { id: '1', title: 'Card 1', description: 'This is card 1 description' },
    { id: '2', title: 'Card 2', description: 'This is card 2 description' },
    { id: '3', title: 'Card 3', description: 'This is card 3 description' },
    { id: '4', title: 'Card 4', description: 'This is card 4 description' },
  ]);

  const { navigation } = props;

  const [refreshing, setRefreshing] = useState(false);

  const handleGoBack = () => {
    // Logic to navigate back (e.g., using React Navigation)
    console.log('Go back to previous screen');
  };

  const handleLogout = () => {
    // Logic to log out (e.g., clearing auth data, redirecting to login)
    console.log('Logging out');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(data.reverse());
      setRefreshing(false);
    }, 2000);
  };

  const showTaskDetail = () => {
    navigation.navigate('TaskDetailScreen');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => showTaskDetail()}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: WHITE_COLOR }}>
        <HStack
          style={styles.hStack}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Side: Back button */}
          <IconButton
            icon={<Text style={styles.arrowText}>←</Text>} // Using a simple text arrow icon for the back button
            onPress={handleGoBack}
            borderRadius="full"
            _icon={{ color: 'white', size: 20 }}
            variant="ghost"
          />
          {/* Center: Screen Name */}
          <Box flex={1} alignItems="center">
            <Text style={styles.screenName}>Home</Text>
          </Box>
          {/* Right Side: Logout button */}
          <Button style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Button>
        </HStack>
      </View>
      <View style={styles.container}>
        {/* </Header> */}
        {/* </Header> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.container}
        />

        <Button style={styles.button}>
          <Text style={styles.buttonText}>Add New Task</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(5),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },

  button: {
    alignSelf: 'flex-end',
    backgroundColor: SECOUNDRY_COLOR,
    marginBottom: 20,
    marginRight: ms(10),
  },
  buttonText: {
    color: 'white',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff0000',
    marginRight: ms(10),
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default HomeScreen;
