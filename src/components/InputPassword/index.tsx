import { Input,InputProps } from 'antd';
import { LockOutlined } from '@ant-design/icons';
type TInput ={
  inputProps:InputProps
}

function InputPasswordComponent ({...props}:TInput) {
  const {inputProps} = props;
  return (
    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} {...inputProps} className=' font-normal'/>
  );
};
export default InputPasswordComponent;