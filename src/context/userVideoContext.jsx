import { createContext, useContext, useEffect, useReducer, useState } from "react";
import userVideoReducer from "../reducers/userVideoReducer";
import AuthContext from "./authContext";
import * as videoServices from "../services/videoServices";
import { useLocation, useNavigate, Navigate} from "react-router-dom";

const UserVideosContext = createContext();

export default UserVideosContext;

export const UserVideosProvider = ({ children, profileId }) => {
  const navigate = useNavigate();
  const [videos, dispatch] = useReducer(userVideoReducer, []);
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation()


  useEffect(() => {
    videoServices.resetUserVideos()
  }, []);

  useEffect(() => {
    setIsLoading(true)
    videoServices.getUserVideos(profileId, page).then(result => {
      dispatch({
        control: 'GET_YOUR_VIDEOS',
        videos: result
      })
      setIsLoading(false)
    }).catch(err=>{  
      console.log(err);
      navigate('/404')
    });
  }, [page, profileId]);

  const handleScroll = () => {
    if (videoServices.reqUserVideos === false) {
      window.removeEventListener("scroll", handleScroll);
      return
    }
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && location.pathname === `/users/${userId}`) {
      setIsLoading(true)
      setPage((prev) => prev + 1);
    }

  }


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    resetState()
  }, [profileId]);









  const addVideo = async (formData) => {
    const newVideo = await videoServices.upload(formData, setUploadProgress);
    dispatch({
      type: 'ADD_VIDEO',
      video: newVideo,
    });
    navigate('/');
  };

  const deleteVideo = (videoId) => {
    videoServices.removeVideo(videoId);
    dispatch({
      control: 'DELETE_VIDEO',
      videoId,
    });
  };

  const editVideo = async (videoId, videoData) => {
    try {
      const updatedVideo = await videoServices.editVideo(videoId, videoData);
      dispatch({
        control: 'EDIT_VIDEO',
        video: updatedVideo,
        videoId,
      });
    } catch (err) {
      console.log("Failed to edit video:", err);
    }
  };

  const changeOwnerVideoAvatar = (userData) => {
    try {
      dispatch({
        control: 'CHANGE_OWNER_VIDEOS_AVATAR',
        userData: userData,
      });
    } catch (err) {
      console.log("Failed to change avatar:", err);
    }
  };
  const resetState = () => {
    videoServices.resetVideos();
    dispatch({
      control: 'RESET',
    });
    setPage(1);
  };
  return (
    <UserVideosContext.Provider value={{ videos, addVideo, deleteVideo, editVideo, changeOwnerVideoAvatar, isLoading }}>
      {children}
    </UserVideosContext.Provider>
  );
};
