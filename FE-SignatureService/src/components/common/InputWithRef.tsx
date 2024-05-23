import React, {forwardRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';

const InputWithRef = forwardRef<TextInput, TextInputProps>((props, ref) => (
  <TextInput ref={ref} {...props} />
));

export default InputWithRef;
