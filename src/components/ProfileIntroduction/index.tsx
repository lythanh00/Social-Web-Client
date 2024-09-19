import React, { useState } from 'react';
import { Button, Card, DatePicker, DatePickerProps, Divider, Input, Modal, Space } from 'antd';
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
import InputComponent from '../Input';
import { useMutation } from 'react-query';
import { api } from '../../apis';
import { useGetProfile, useUpdateProfile } from '../../apis/Profiles';
import { format } from 'date-fns';

const ProfileIntroduction: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState(profile.firstName);
  const [newLastName, setNewLastName] = useState(profile.lastName);
  const [newBio, setNewBio] = useState(profile.bio);
  const [newLocation, setNewLocation] = useState(profile.location);
  const [newInterests, setNewInterests] = useState(profile.interests);
  const [time, setTime] = useState<any | null>(profile.dateOfBirth);

  const updateProfileMutation = useUpdateProfile();
  const { refetch: refetchDataProfile } = useGetProfile();

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setTime(dateString);
  };

  const formattedDate = profile.dateOfBirth
    ? format(profile.dateOfBirth, 'dd/MM/yyyy') // Thay đổi định dạng theo nhu cầu
    : null;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateProfileMutation.mutate(
      {
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: time,
        bio: newBio,
        location: newLocation,
        interests: newInterests,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          refetchDataProfile();
        },
        onError: (error) => {
          console.error('Có lỗi xảy ra khi cập nhật:', error);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card className="profile-introduction-card">
      <h2 className="introduction-title">Giới thiệu</h2>
      <Divider />
      <div className="profile-introduction-content">
        <div className="profile-introduction-item">
          <UserOutlined className="profile-introduction-icon" />
          Họ tên:
          <span className="profile-introduction-text">{profile.lastName + ' ' + profile.firstName}</span>
        </div>

        <div className="profile-introduction-item">
          <CalendarOutlined className="profile-introduction-icon" />
          Ngày sinh: <div className="date-of-birth">{formattedDate}</div>
          <span className="profile-introduction-text"> </span>
        </div>

        <div className="profile-introduction-item">
          <HomeOutlined className="profile-introduction-icon" />
          Địa chỉ:
          <span className="profile-introduction-text">{profile.location}</span>
        </div>

        <div className="profile-introduction-item">
          <CustomerServiceOutlined className="profile-introduction-icon" />
          Sở thích:
          <span className="profile-introduction-text"> {profile.interests}</span>
        </div>
        <Divider />
        <div className="profile-introduction-bio">
          <SolutionOutlined className="profile-introduction-icon" />
          Tiểu sử:
          <p> {profile.bio}</p>
        </div>
      </div>
      <hr className="mt-5 mb-5" />
      <div>
        <Button type="primary" onClick={showModal}>
          Chỉnh sửa thông tin cá nhân
        </Button>
        <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {/*first name*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <UserOutlined className="profile-introduction-icon" />
                First Name:
                <span className="profile-introduction-text">
                  <Input
                    className="update-profile-input"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </span>
              </div>
            </Space.Compact>
          </p>
          {/*last name*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <UserOutlined className="profile-introduction-icon" />
                Last Name:
                <span className="profile-introduction-text">
                  <Input
                    className="update-profile-input"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </span>
              </div>
            </Space.Compact>
          </p>
          {/*date of birth*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <CalendarOutlined className="profile-introduction-icon" />
                Date of Birth:
                <span className="profile-introduction-text">
                  <div className="date-of-birth">{formattedDate}</div>
                  <DatePicker
                    onChange={onChange}
                    // defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                    format="YYYY-MM-DD"
                  />
                </span>
              </div>
            </Space.Compact>
          </p>
          {/*location*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <HomeOutlined className="profile-introduction-icon" />
                Location:
                <span className="profile-introduction-text">
                  <Input
                    className="update-profile-input"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </span>
              </div>
            </Space.Compact>
          </p>
          {/*interests*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <CustomerServiceOutlined className="profile-introduction-icon" />
                Interests:
                <span className="profile-introduction-text">
                  <Input
                    className="update-profile-input"
                    value={newInterests}
                    onChange={(e) => setNewInterests(e.target.value)}
                  />
                </span>
              </div>
            </Space.Compact>
          </p>
          {/*bio*/}
          <p>
            <Space.Compact>
              <div className="profile-introduction-item">
                <SolutionOutlined className="profile-introduction-icon" />
                Bio:
                <span className="profile-introduction-text">
                  <Input className="update-profile-input" value={newBio} onChange={(e) => setNewBio(e.target.value)} />
                </span>
              </div>
            </Space.Compact>
          </p>
        </Modal>
      </div>
    </Card>
  );
};

export default ProfileIntroduction;
