import React from 'react';
import { Button, Text, HStack } from 'native-base';
import PropTypes from 'prop-types';
import { GRAY40_COLOR, SECOUNDRY_COLOR, WHITE_COLOR } from '../../utils/color';
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
