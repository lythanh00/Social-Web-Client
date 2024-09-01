// src/components/InputEmail.tsx
import React, { useState } from 'react';
import { Input, InputProps, Tooltip } from 'antd';
import validateEmail from './validateEmail';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface InputEmailProps {
    onChange: (value: string, isValid: boolean) => void;
    inputProps: InputProps
}

const InputEmail: React.FC<InputEmailProps> = ({ onChange, ...props }) => {
    const { inputProps } = props;
    const [email, setEmail] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
        const isValidEmail = validateEmail(value);
        setIsValid(isValidEmail);
        onChange(value, isValidEmail);
    };

    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-9'>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={handleInputChange} {...inputProps} ></Input>

            </div>
            <div className='col-span-1 mt-2 -mr-4'>
                {isValid !== null && (
                    <p className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                        {isValid ? <CheckCircleOutlined /> : <Tooltip title="Incorrect Email structure"><span><CheckCircleOutlined /></span></Tooltip>}
                    </p>
                )}
            </div>
        </div>
    );
};

export default InputEmail;
