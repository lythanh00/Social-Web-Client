import React, { useState } from 'react';
import './index.scss';
import { Avatar, Button, Card, Image, message, Modal, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload/interface';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useCreatePost } from '../../apis/Posts';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const StatusUpdate: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<RcFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate: createPost, isLoading } = useCreatePost(); // Sử dụng mutation hook

  const handleUploadImage = ({ file }: { file: RcFile }) => {
    setImages((prevImages) => [...prevImages, file]);
    // Cập nhật fileList để hiển thị ảnh trong Upload
    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'done', // Cần cập nhật trạng thái để Ant Design nhận diện đã upload
      url: URL.createObjectURL(file), // Tạo URL tạm thời để xem trước ảnh
    };
    setFileList((prevFileList) => [...prevFileList, newFile]);
  };
  const handleOk = async () => {
    if (!content && images.length === 0) {
      message.warning('Vui lòng nhập nội dung hoặc tải lên hình ảnh!');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);

    images.forEach((image) => {
      formData.append('images', image);
    });

    createPost(formData, {
      onSuccess: () => {
        message.success('Bài viết đã được đăng!');
        setIsModalOpen(false);
        setContent('');
        setImages([]);
        setFileList([]);
      },
      onError: () => {
        message.error('Có lỗi xảy ra khi đăng bài viết!');
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Card className="status-update-card" style={{ marginBottom: 16 }}>
      <Meta
        className="status-update-meta"
        avatar={<Avatar className="status-update-meta-avatar" src={profile.avatar.url} />}
        title={
          <div>
            <Button className="question-button" type="primary" onClick={showModal}>
              {profile.firstName} ơi, bạn đang nghĩ gì thế?
            </Button>
            <Modal
              className="custom-modal-create-post"
              title="Tạo bài viết"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)} // Hàm đóng modal
              footer={
                // Tùy chỉnh footer
                <Button type="primary" onClick={handleOk} className="full-width-button" loading={isLoading}>
                  {isLoading ? 'Đang đăng...' : 'Đăng'}
                </Button>
              }
            >
              <TextArea
                rows={4}
                placeholder={`${profile.firstName} ơi, bạn đang nghĩ gì thế?`}
                value={content}
                onChange={handleChange}
              />
              <Upload
                beforeUpload={(file) => {
                  handleUploadImage({ file });
                  return false; // Ngăn không cho tự động upload
                }}
                fileList={fileList}
                listType="picture-card"
                onRemove={(file) => {
                  // Xóa file khỏi danh sách lưu trữ hình ảnh (images) và fileList
                  setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
                  setImages((prevImages) => prevImages.filter((image) => image.uid !== file.uid));
                }}
              >
                <Button>
                  <CameraOutlined />
                </Button>
              </Upload>
            </Modal>
          </div>
        }
      />
    </Card>
  );
};

export default StatusUpdate;
