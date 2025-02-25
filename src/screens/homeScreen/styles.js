import { Dimensions, StyleSheet } from 'react-native';
import { ms } from '../../utils/deviceConfig';
import { SECOUNDRY_COLOR, WHITE_COLOR } from '@/src/utils/color';

const styles = StyleSheet.create({
  container: {
    padding: ms(5),
    flex: 1,
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
  emptyListStyle: {
    alignSelf: 'center',
    marginTop: ms(250),
  },
});

export default styles;
