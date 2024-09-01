import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { api } from '../../apis';
import { ConfigProvider, Form, Layout, Tooltip, message } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import InputPassWord from '../../components/InputPassword';
import Header from '../../components/Header';
import SignInMethod from '../../components/SignInMethod';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import InputEmail from '../../components/InputEmail';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

interface ILoginDto {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [messageApi] = message.useMessage();
  const [inputError, setInputError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Nếu token tồn tại, chuyển hướng đến trang home
      navigate(CLIENT_ROUTE_PATH.DASHBOARD);
    }
  }, [navigate]);

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
    if (isValid === true) {
      setEmail(value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    const isValidPassword = validatePassword(value);
    setIsValid(isValidPassword);
    if (isValid === true) {
      setPassword(value);
    }
  };

  // Hàm validate email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    // Validate password (e.g., minimum length)
    return password.length >= 6;
  };

  const signInMutate = useMutation({
    mutationFn: (payload: ILoginDto) => api.post(`${process.env.REACT_APP_API_URL}/auth/login`, payload),
    onSuccess: (data) => {
      localStorage.setItem('token', data?.data?.token);
      navigate(CLIENT_ROUTE_PATH.DASHBOARD);
      setInputError(''); // Xóa lỗi khi thành công
      message.success('Đăng nhập thành công'); // Hiển thị thông báo thành công
    },
    onError: (error) => {
      console.error('onError:', error);
      setInputError('Sai mật khẩu của tài khoản'); // Cập nhật lỗi
      message.error('Sai mật khẩu của tài khoản'); // Hiển thị thông báo lỗi
    },
  });

  // Hàm thông báo lỗi và chứa nhiều sự kiện onClick
  const handleClick = () => {
    if (!password || !email) {
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
    if (password.length < 6) {
      return messageApi.open({
        type: 'error',
        content: 'Mật khẩu dưới 6 kí tự',
      });
    } else {
      signInMutate.mutate({ email, password });
    }
  };

  return (
    <Layout className='bg-[url("https://www.zandxgroup.com/wp-content/uploads/2017/05/nature-sea-water-night-sunset-sky-clouds-sea-sunset-sky-background-wallpaper-widescreen-full-screen-widescreen-hd-wallpapers-background-wallpaper.jpg")] bg-gray-400 bg-cover bg-no-repeat h-screen w-full'>
      <Header />
      <div className="h-screen w-full flex  justify-center items-center">
        <Form name="basic" className="bg-zinc-200/20 p-5 rounded-md shadow-2xl m-10">
          <div className="text-center text-white m-2 font-bold text-xl">ĐĂNG NHẬP</div>
          <div className="h-px w-48 mx-auto bg-white mb-4"></div>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Hãy nhập email!' }]}
            className="font-bold text-center opacity-100"
          >
            <InputEmail
              inputProps={{ size: 'middle', className: 'font-normal', placeholder: 'Nhập Email' }}
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
            className="font-bold text-center "
            validateStatus={inputError ? 'error' : undefined}
            help={inputError || undefined}
          >
            <div className="grid grid-cols-10">
              <div className="col-span-9">
                <InputPassWord
                  inputProps={{
                    size: 'middle',
                    className: 'font-normal',
                    placeholder: 'Nhập mật khẩu',
                    value: password,
                    onChange: handlePasswordChange,
                  }}
                />
              </div>
              <div className="col-span-1 mt-2 -mr-4">
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
          <div className="text-center"></div>
          <QuestionCircleOutlined />
          <Link to="/forgotpassword">
            <ButtonLink buttonProps={{ size: 'middle', className: 'text-black' }} textButton="Quên mật khẩu?" />
          </Link>
          <Form.Item className="text-center">
            <ConfigProvider
              button={{
                className: linearGradientButton,
              }}
            >
              <Button
                buttonProps={{
                  size: 'middle',
                  className: 'text-black',
                  onClick: handleClick,
                }}
                textButton="Đăng nhập"
              />
            </ConfigProvider>
            <Link to="/register">
              <ButtonLink buttonProps={{ size: 'middle', className: 'text-black' }} textButton="Tạo tài khoản mới?" />
            </Link>
          </Form.Item>
          <SignInMethod />
        </Form>
        <Outlet />
      </div>
    </Layout>
  );
};

export default SignIn;
