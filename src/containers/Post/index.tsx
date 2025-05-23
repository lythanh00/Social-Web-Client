import React, { useEffect } from 'react';
import { Layout } from 'antd';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';
import './index.scss';
import { useGetProfile } from '../../apis/Profiles';
import { useAppDispatch } from '../../store';
import { setProfile } from '../../store/profileSlice';
import HomePostCard from '../../components/Home/HomePostCard';
import { useGetPostByPostId } from '../../apis/Posts';
import { useSearchParams } from 'react-router-dom';

const { Content, Sider } = Layout;

const Post: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: dataProfile } = useGetProfile();

  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);

  const [searchParams] = useSearchParams();
  const stringPostId = searchParams.get('postId');
  const postId = parseInt(stringPostId as any);
  const { data: dataGetPostByPostId } = useGetPostByPostId(postId);
  if (!dataGetPostByPostId) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="home-page">
      <Layout className="home-page-layout-content">
        <Sider width={350} breakpoint="lg" collapsedWidth="0">
          <LeftSidebar />
        </Sider>
        <Content className="content">
          <div className="post-div">
            <HomePostCard post={dataGetPostByPostId} />
          </div>
        </Content>
        <Sider width={350} breakpoint="lg" collapsedWidth="0">
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Post;
