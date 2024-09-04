import React, { useContext } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { useMutation } from 'react-query';
import { api } from '../../apis';
import { Form, ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Outlet, Link } from "react-router-dom";

const WaitForConfirmation: React.FC = () => {

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
        background: linear-gradient(135deg, #6253E1, #04BEFE);
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

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const verifytoken = useMutation({
    mutationFn: async (data: { token: any }) => {
      try {
        const response = await api.post(`${process.env.REACT_APP_API_URL}/auth/verify-token`, {
          token: data.token,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('onError:', error);
    },
    // onSettled: () => {
    //   console.log('onSettled');
    // },
    // retry: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 15
  });


  return (
    <div>
      <Header />
      <div className='bg-[url("https://www.zandxgroup.com/wp-content/uploads/2017/05/nature-sea-water-night-sunset-sky-clouds-sea-sunset-sky-background-wallpaper-widescreen-full-screen-widescreen-hd-wallpapers-background-wallpaper.jpg")] bg-cover bg-no-repeat h-screen w-full flex justify-center items-center '>
        <Form className='bg-zinc-200/20 p-5 rounded-md shadow-xl m-10 '
        >
          <div className='m-2 font-bold text-xl text-white'>Chờ xác nhận</div>
          <div className='h-px w-48 bg-slate-400 mb-4'></div>
          <div className='text-white'>Tài khoản bạn đã đăng kí thành công, đang chờ Admin duyệt tài khoản</div>
          <div className='h-10 flex'>
            <ConfigProvider
              button={{
                className: linearGradientButton,
              }}
            >
              <Link to="/">
              <Button buttonProps={{ size: 'middle', className: 'text-white mt-3', onClick: () => verifytoken.mutate({ token }) }} textButton='Quay về trang đăng nhập' />
              </Link>
            </ConfigProvider>
          </div>
        </Form>
        <Outlet />
      </div>
    </div>
  );
};

export default WaitForConfirmation;