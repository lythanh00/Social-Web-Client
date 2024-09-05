import React, { useState } from 'react';
import { Input, InputProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type TInputSR = {
  inputProps: InputProps
}

function InputSRComponent({ ...props }: TInputSR) {
  const { inputProps } = props;
  return (
    <Input prefix={<UserOutlined className="site-form-item-icon" />} {...inputProps}/>
  );
};
export default InputSRComponent;