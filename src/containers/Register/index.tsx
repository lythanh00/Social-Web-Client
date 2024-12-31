import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { api } from '../../apis';
import { Form, Tooltip, ConfigProvider, message, Layout } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Outlet, Link } from 'react-router-dom';
import ButtonC from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import InputEmail from '../../components/InputEmail';
import InputPassWord from '../../components/InputPassword';
import Header from '../../components/Header';
import background from '../../assets/background.jpg';

interface IRegisterDto {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [isValidUN, setIsValidUN] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isValidCP, setIsValidCP] = useState<boolean | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm xử lý màu của button
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    const isValidPassword = validatePassword(value);
    setIsValid(isValidPassword);
    setPasswordError(null);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const isValidPasswordCP = validateConfirmPassword(value);
    setIsValidCP(isValidPasswordCP);
    setPasswordError(null);
  };
  // Hàm validate email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // 2 hàm validate mật khẩu và xác nhận mật khẩu
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  const validateConfirmPassword = (confirmPassword: string): boolean => {
    return confirmPassword.length >= 6;
  };

  // Hàm khiển tra mật khẩu và xác nhận mật khẩu
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Mật khẩu không khớp');
    }
  };

  // Hàm POST dữ liệu đăng kí lên database
  const register = useMutation({
    mutationFn: (payload: IRegisterDto) => api.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload),
    onSuccess: (data) => {
      message.success('Đăng ký thành công! Xác thực email');
    },
    onError: (error: any) => {
      console.error('onError:', error);
    },
  });

  // Hàm thông báo lỗi và chứa nhiều sự kiện onClick
  const handleClick = () => {
    if (!password || !confirmPassword || !email) {
      return messageApi.open({
        type: 'error',
        content: 'Không được để trống',
      });
    }
    if (!validateEmail(email)) {
      return messageApi.open({
        type: 'error',
        content: 'Email không đúng cấu trúc',
      });
    }
    if (password !== confirmPassword) {
      return messageApi.open({
        type: 'error',
        content: 'Mật khẩu không khớp',
      });
    }
    if (password.length < 6 && confirmPassword.length < 6) {
      return messageApi.open({
        type: 'error',
        content: 'Mật khẩu dưới 6 kí tự',
      });
    } else {
      register.mutate({ email, password });
    }
  };

  return (
    <div>
      <Header />
      {contextHolder}
      <Layout
        style={{
          backgroundImage: `url(${background})`,
        }}
        className="bg-gray-400 bg-cover bg-no-repeat h-screen w-full flex justify-center items-center"
      >
        <Form name="basic" className="bg-zinc-200/70 p-5 rounded-md shadow-xl m-10 " onFinish={handleSubmit}>
          <div className="text-center text-black text-2xl m-2 font-bold">ĐĂNG KÝ</div>
          <div className="h-px w-48 mx-auto bg-black mb-4"></div>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
            className="font-bold text-center"
          >
            <InputEmail
              inputProps={{ size: 'middle', className: 'font-normal', placeholder: 'Nhập Email' }}
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
            className="font-bold text-center "
          >
            <div className="grid grid-cols-10">
              <div className="col-span-9">
                <InputPassWord
                  inputProps={{
                    size: 'middle',
                    className: 'font-normal',
                    placeholder: 'Hãy nhập mật khẩu!',
                    value: password,
                    onChange: handlePasswordChange,
                  }}
                />
              </div>
              <div className="col-span-1 -mr-4 mt-2">
                {isValid !== null && (
                  <p className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {isValid ? (
                      <CheckCircleOutlined />
                    ) : (
                      <Tooltip title="Mật khẩu phải đủ 6 kí tự trở lên">
                        <span>
                          <CheckCircleOutlined />
                        </span>
                      </Tooltip>
                    )}
                  </p>
                )}
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmpassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
            className="font-bold text-center"
          >
            <div className="grid grid-cols-10">
              <div className="col-span-9">
                <InputPassWord
                  inputProps={{
                    size: 'middle',
                    className: 'font-normal',
                    placeholder: 'Nhập lại mật khẩu',
                    value: confirmPassword,
                    onChange: handleConfirmPasswordChange,
                  }}
                />
              </div>
              <div className="col-span-1 -mr-4 mt-2">
                {isValidCP !== null && (
                  <p className={`text-sm ${isValidCP ? 'text-green-500' : 'text-red-500'}`}>
                    {isValidCP ? (
                      <CheckCircleOutlined />
                    ) : (
                      <Tooltip title="Mật khẩu phải đủ 6 kí tự trở lên">
                        <span>
                          <CheckCircleOutlined />
                        </span>
                      </Tooltip>
                    )}
                  </p>
                )}
              </div>
            </div>
            {passwordError && <p className="text-red-600 text-left mt-2">{passwordError}</p>}
          </Form.Item>
          <Form.Item className="text-center">
            <ConfigProvider
              button={{
                className: linearGradientButton,
              }}
            >
              <ButtonC
                buttonProps={{
                  size: 'middle',
                  className: 'bg-blue-400 text-black',
                  htmlType: 'submit',
                  onClick: handleClick,
                }}
                textButton="Đăng ký"
              />
            </ConfigProvider>
            <Link to="/">
              <ButtonLink buttonProps={{ size: 'middle', className: 'text-black' }} textButton="Đã có tài khoản?" />
            </Link>
          </Form.Item>

          <Outlet />
        </Form>
      </Layout>
    </div>
  );
};

export default Register;
