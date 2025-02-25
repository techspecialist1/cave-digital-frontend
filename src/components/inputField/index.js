import React from 'react';
import { FormControl, Input, Text, VStack } from 'native-base';

const InputField = (props) => {
  const {
    values,
    onChangeText,
    placeholder,
    label,
    placeholderColor,
    type,
    customStyle,
    customLabelStyle,
    keyboardType,
    maxLength,
    handleFocus,
    handleBlur,
    errors,
    secureText,
    multiline = false,
    textAlignVertical,
    autoFocus = false,
    autoCapitalize,
  } = props || {};

  return (
    <FormControl isInvalid={!!errors}>
      {label && (
        <FormControl.Label _text={{ style: customLabelStyle }}>
          {label}
        </FormControl.Label>
      )}
      <Input
        type={type}
        style={customStyle}
        value={values}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureText}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        focusOutlineColor={'light.50'}
        {...props}
      />
      {errors && <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default InputField;
