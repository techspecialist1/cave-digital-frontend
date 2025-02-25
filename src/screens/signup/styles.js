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
    marginTop: ms(10),
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
    // fontFamily: 'SpaceMono',
    // ...fontSize.fontSizeRegular(),
    // ...fonts.fontFamilyRegular(),
  },

  signUpTxtbtn: {
    color: COLOR_BLACK,
    // ...fontSize.fontSizeMedium(),
    // ...fonts.fontFamilyRegular(),
  },
  keyboardViewCss: { justifyContent: 'center', flex: 1 },
  scrollViewContainerCss: { flexGrow: 1, paddingBottom: ms(50) },
  scrollViewCss: { flex: 1 },
  login: {
    textDecorationLine: 'underline',
  },
});

export default styles;
