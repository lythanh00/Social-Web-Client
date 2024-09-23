import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetProfileByUserId } from '../../apis/Profiles';

const OrtherProfileInfo: React.FC = () => {
  const ortherProfile = useSelector((state: RootState) => state.profile.ortherProfile);
  console.log('OrtherProfileInfo', ortherProfile);

  return (
    <div className="profile-info">
      <div className="relative">
        <img
          src={ortherProfile?.coverPhoto.url} // ảnh bìa
          alt="cover-photo"
          className="profile-info-cover-photo"
        />
      </div>

      <div className="profile-info-avatar-name">
        <div className="relative">
          <img
            src={ortherProfile?.avatar.url} // avatar
            alt="avatar"
            className="profile-info-avatar "
          />
        </div>
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{ortherProfile?.lastName + ' ' + ortherProfile?.firstName}</h1>
          <p className="text-gray-600">77 người bạn</p>
        </div>
      </div>

      <div className="profile-info-addfr-mess"></div>
      <hr className="border-gray-300 mt-4 mb-4" />
    </div>
  );
};

export default OrtherProfileInfo;
