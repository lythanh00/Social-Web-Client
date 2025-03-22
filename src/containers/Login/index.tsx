import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { api } from '../../apis';
import { Form, Layout, Tooltip, message } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import InputPassWord from '../../components/InputPassword';
import Header from '../../components/Header';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import InputEmail from '../../components/InputEmail';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import background from '../../assets/background.jpg';

interface ILoginDto {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [inputError, setInputError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Nếu token tồn tại, chuyển hướng đến trang home
      navigate(CLIENT_ROUTE_PATH.HOME);
    }
  }, [navigate]);

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
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
  const isEmail = (email: string) => {
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
      localStorage.setItem('token', data?.data?.access_token);
      localStorage.setItem('refreshToken', data?.data?.refresh_token);
      navigate(CLIENT_ROUTE_PATH.HOME);
      setInputError(''); // Xóa lỗi khi thành công
      message.success('Đăng nhập thành công!'); // Hiển thị thông báo thành công
    },
    onError: (error) => {
      console.error('onError:', error);
      setInputError('Sai email hoặc mật khẩu'); // Cập nhật lỗi
      message.error('Sai email hoặc mật khẩu'); // Hiển thị thông báo lỗi
    },
  });

  // Hàm thông báo lỗi và chứa nhiều sự kiện onClick
  const handleClick = () => {
    if (!password || !email) {
      return messageApi.open({
        type: 'error',
        content: 'Các trường không được để trống',
      });
    }
    if (!isEmail(email)) {
      return messageApi.open({
        type: 'error',
        content: 'Định dạng email không hợp lệ',
      });
    }
    if (password.length < 6) {
      return messageApi.open({
        type: 'error',
        content: 'Mật khẩu phải có ít nhất 6 ký tự',
      });
    } else {
      signInMutate.mutate({ email, password });
    }
  };

  return (
    <>
      {contextHolder}
      <Layout
        style={{
          backgroundImage: `url(${background})`,
        }}
        className="bg-gray-400 bg-cover bg-no-repeat h-screen w-full"
      >
        <Header />
        <div className="h-screen w-full flex  justify-center items-center">
          <Form name="basic" className="bg-zinc-200/95 p-5 rounded-md shadow-2xl m-10">
            <div className="text-center text-black m-2 font-bold text-xl">ĐĂNG NHẬP</div>
            <div className="h-px w-48 mx-auto bg-black mb-4"></div>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
              className="font-bold text-center opacity-100"
            >
              <InputEmail
                inputProps={{ size: 'middle', className: 'font-normal', placeholder: 'email' }}
                onChange={handleEmailChange}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
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
                      placeholder: 'password',
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
                        <Tooltip title="Mật khẩu phải có ít nhất 6 ký tự">
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
              <Button
                buttonProps={{
                  size: 'middle',
                  className: 'bg-blue-400 text-black',
                  htmlType: 'submit',
                  onClick: handleClick,
                }}
                textButton="Đăng nhập"
              />
              <Link to="/register">
                <ButtonLink buttonProps={{ size: 'middle', className: 'text-black' }} textButton="Tạo tài khoản" />
              </Link>
            </Form.Item>
          </Form>
          <Outlet />
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
