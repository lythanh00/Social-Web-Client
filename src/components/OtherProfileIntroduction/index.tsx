import React, { useState } from 'react';
import { Card, Divider } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  CustomerServiceOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { format } from 'date-fns';

const OtherProfileIntroduction: React.FC = () => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);

  const formattedDate = otherProfile.dateOfBirth
    ? format(otherProfile.dateOfBirth, 'dd/MM/yyyy') // Thay đổi định dạng theo nhu cầu
    : null;

  return (
    <Card className="profile-introduction-card">
      <h2 className="introduction-title">Giới thiệu</h2>
      <Divider />
      <div className="profile-introduction-content">
        <div className="profile-introduction-item">
          <UserOutlined className="profile-introduction-icon" />
          Họ tên:
          <span className="profile-introduction-text">{otherProfile.lastName + ' ' + otherProfile.firstName}</span>
        </div>

        <div className="profile-introduction-item">
          <CalendarOutlined className="profile-introduction-icon" />
          Ngày sinh: <div className="date-of-birth">{formattedDate}</div>
          <span className="profile-introduction-text"> </span>
        </div>

        <div className="profile-introduction-item">
          <HomeOutlined className="profile-introduction-icon" />
          Địa chỉ:
          <span className="profile-introduction-text">{otherProfile.location}</span>
        </div>

        <div className="profile-introduction-item">
          <CustomerServiceOutlined className="profile-introduction-icon" />
          Sở thích:
          <span className="profile-introduction-text"> {otherProfile.interests}</span>
        </div>
        <Divider />
        <div className="profile-introduction-bio">
          <SolutionOutlined className="profile-introduction-icon" />
          Tiểu sử:
          <p> {otherProfile.bio}</p>
        </div>
      </div>
      <hr className="mt-5 mb-5" />
    </Card>
  );
};

export default OtherProfileIntroduction;
