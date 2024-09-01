import { FacebookOutlined, GoogleOutlined, TwitterOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import GoogleLoginLogo from '../GoogleLoginLogo';

function SignInMethod() {
  return (
    <div className="-mt-6">
      <div className="text-center text-white">Kết nối với mạng xã hội của bạn:</div>
      <div className="text-center text-3xl mt-2">
        <FacebookOutlined className="mx-3 text-blue-800 " />
        {/* <GoogleOutlined className='mx-3 text-red-500' /> */}
        <GoogleLoginLogo />
        <TwitterOutlined className="mx-3 text-blue-400" />
      </div>
    </div>
  );
}
export default SignInMethod;
