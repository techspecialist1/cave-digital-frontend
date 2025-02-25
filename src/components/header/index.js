import React from 'react';
import { ArrowBackIcon, Box, Button, HStack, Text, View } from 'native-base';
import { Pressable } from 'react-native';
import styles from './styles';

const HeaderComponent = (props) => {
  const {
    onBackPress,
    onLogoutPress,
    showBackIcon = false,
    title = 'Home',
    showLogoutButton = false,
  } = props || {};

  return (
    <View style={styles.header}>
      <HStack alignItems="center" justifyContent="space-between">
        <Pressable style={styles.backIcon} onPress={onBackPress}>
          {showBackIcon ? <ArrowBackIcon /> : <></>}
        </Pressable>
        <Box flex={showBackIcon ? 1.5 : 1} alignSelf={'center'}>
          <Text>{title}</Text>
        </Box>
        {showLogoutButton ? (
          <Button style={styles.logoutButton} onPress={onLogoutPress}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Button>
        ) : (
          <View></View>
        )}
      </HStack>
    </View>
  );
};

export default HeaderComponent;
