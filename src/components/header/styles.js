import { StyleSheet } from 'react-native';
import { ms } from '../../utils/deviceConfig';
import { WHITE_COLOR } from '../../utils/color';

const styles = StyleSheet.create({
  header: {
    backgroundColor: WHITE_COLOR,
    width: '100%',
  },
  backIcon: {
    marginLeft: ms(10),
    flex: 1,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff0000',
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default styles;
