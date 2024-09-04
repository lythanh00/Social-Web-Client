import React from 'react';
import { Input,InputProps } from 'antd';
type TInput ={
  inputProps:InputProps
}

function InputComponent ({...props}:TInput) {
  const {inputProps} = props;
  return (
    <Input {...inputProps} />
  );
};
export default InputComponent;