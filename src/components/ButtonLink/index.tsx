import React from 'react';
import { Button,ButtonProps } from 'antd';

type TButtonLink = {
  textButton: React.ReactNode,
  buttonProps: ButtonProps
}

function buttonLink({...props}:TButtonLink)  {
  const {textButton, buttonProps} = props;
  return (
    <Button type='link'  {...buttonProps}>{textButton}</Button>
  );
};
export default buttonLink;