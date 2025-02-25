import { StyleSheet } from 'react-native';
import { ms } from '../../utils/deviceConfig';
import { COLOR_BLACK, SECOUNDRY_COLOR } from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: ms(32),
  },
  signUpTochableBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtnCss: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: ms(10),
    marginVertical: ms(14),
  },
  resetTextCss: {
    color: SECOUNDRY_COLOR,
    fontSize: ms(14),
    fontWeight: '400',
  },

  signUpTxtbtn: {
    color: COLOR_BLACK,
  },
  keyboardViewCss: { justifyContent: 'center', flex: 1 },
  scrollViewContainerCss: { flexGrow: 1, paddingBottom: ms(50) },
  scrollViewCss: { flex: 1 },
  errorText: { color: '#FF0000' },
});

export default styles;
