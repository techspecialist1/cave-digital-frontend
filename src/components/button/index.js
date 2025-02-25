import React from 'react';
import { Button, Text, HStack } from 'native-base';
import PropTypes from 'prop-types';

import { GRAY40_COLOR, SECOUNDRY_COLOR, WHITE_COLOR } from '../../utils/color';
// import fonts from '../../utils/style/fonts';
// import fontSize from '../../utils/style/fontSize';
import { ms } from '../../utils/deviceConfig';

const RoundedPrimaryButton = ({
  label,
  disabled = false,
  onPress,
  buttonTextStyle = {},
  buttonStyle = {},
}) => {
  return (
    <Button
      isDisabled={disabled}
      onPress={onPress}
      bg={disabled ? GRAY40_COLOR : SECOUNDRY_COLOR}
      borderRadius={30}
      height={ms(54)}
      _pressed={{ opacity: 0.6 }}
      style={buttonStyle}
    >
      <HStack space={2} alignItems="center">
        <Text
          style={[
            { color: WHITE_COLOR, letterSpacing: ms(1) },
            buttonTextStyle,
          ]}
        >
          {label}
        </Text>
      </HStack>
    </Button>
  );
};

RoundedPrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  buttonTextStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

export default RoundedPrimaryButton;
