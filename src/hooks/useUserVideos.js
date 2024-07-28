import { useContext } from 'react';
import UserVideosContext from '../context/userVideoContext';


const useUserVideos = () => {
  const context = useContext(UserVideosContext);
  if (!context) {
    throw new Error('useUserVideos must be used within a UserVideosProvider');
  }
  return context;
};

export default useUserVideos;
