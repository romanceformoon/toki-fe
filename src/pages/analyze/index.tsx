import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { Seo } from '~/components/Seo';
import useLoginUser from '~/hooks/useLoginUser';
import axiosInstance from '~/utils/axiosInstance';

const LampGraph = () => {
  const router = useRouter();
  const { isLogined, uid } = useLoginUser();
  const [uploadFile, setUploadFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file === uploadFile) return;

    const maxSize = 1024 ** 2 * 5; // 5MB

    if (maxSize < file.size) {
      alert('해당 파일은 제한된 용량을 초과하였습니다.');
      return;
    }

    if (!file.name.endsWith('.db')) {
      alert('.db 확장자 파일만 업로드 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('db', file);

    try {
      setIsUploading(true);
      const response = await axiosInstance.post(`/toki-api/data/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadFile(file);
      router.push(`/user/${uid}`);
    } catch (err) {
      alert('서버 에러 발생');
      setIsUploading(false);
    }
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLogined) {
        setIsDragging(true);
      }
    },
    [isLogined]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (isLogined && e.dataTransfer.files && e.dataTransfer.files[0]) {
        await handleFile(e.dataTransfer.files[0]);
      }
    },
    [isLogined]
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLoginClick = async () => {
    const response = await axios.get('/toki-api/auth/discord/oauth-url');
    router.push(response.data.oauth_url);
  };

  return (
    <>
      <Seo type='analyze' />

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isUploading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography variant='h4'>LR2files/Database/Score 경로에 있는</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' fontWeight={700}>
              .db 확장자 파일
            </Typography>
            <Typography variant='h4'>을 업로드 해주세요.</Typography>
          </Box>
          <Typography variant='h4'>
            일반적으로 용량이 제일 큰 파일이 현재 사용 중인 파일입니다.
          </Typography>
        </Box>

        {isLogined ? (
          <Box
            sx={{
              position: 'relative',
              p: 5,
              width: '50rem',
              border: isDragging ? '2px dashed #5783db' : '2px dashed #ccc',
              bgcolor: isDragging ? 'rgba(87, 131, 219, 0.05)' : 'transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleButtonClick}
          >
            {/* 드래그 이벤트를 처리할 투명한 영역 - 모든 컨텐츠를 덮음 */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />

            <input type='file' accept='.db' onChange={onChangeFile} hidden ref={fileInputRef} />

            <UploadFileIcon
              sx={{
                width: '6rem',
                height: '6rem',
                color: isDragging ? '#5783db' : 'gray',
                mb: 2
              }}
            />
            <Typography variant='h5' color={isDragging ? '#5783db' : 'gray'}>
              {isDragging
                ? '파일을 여기에 놓으세요'
                : '파일을 이곳에 드래그하거나 클릭하여 선택하세요'}
            </Typography>
            <Typography variant='h5' color='text.secondary' mt={1}>
              최대 5MB, .db 파일만 가능
            </Typography>
          </Box>
        ) : (
          <Button
            variant='contained'
            component='label'
            sx={{ borderRadius: 10 }}
            onClick={handleLoginClick}
          >
            <PersonIcon sx={{ width: '2.4rem', height: '2.4rem', mr: 1 }} />
            <Typography variant='h4'>로그인이 필요합니다.</Typography>
          </Button>
        )}
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default LampGraph;
