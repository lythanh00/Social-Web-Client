import React from 'react';
import { Button, ButtonProps } from 'antd';
import './index.scss'

type TButton = {
  textButton: React.ReactNode,
  buttonProps: ButtonProps,
}

function button({ ...props }: TButton) {
  const { textButton, buttonProps } = props;
  return (
    <div className='icon-button'>
      <Button type="primary"  {...buttonProps}>{textButton}</Button>
    </div>
  ); 
};
export default button;
