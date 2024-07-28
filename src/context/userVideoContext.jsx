import { createContext, useContext, useEffect, useReducer, useState } from "react";
import userVideoReducer from "../reducers/userVideoReducer";
import AuthContext from "./authContext";
import * as videoServices from "../services/videoServices";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const UserVideosContext = createContext();

export default UserVideosContext;

export const UserVideosProvider = ({ children, profileId }) => {
  const navigate = useNavigate();
  const [videos, dispatch] = useReducer(userVideoReducer, []);
  const { userId, username, email, avatar } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation()


  useEffect(() => {

    resetState()
  }, [profileId]);




  useEffect(() => {
    setIsLoading(true)

    videoServices.getUserVideos(profileId, page).then(result => {
      console.log(result);
      dispatch({
        type: 'GET_YOUR_VIDEOS',
        videos: result
      })
      setIsLoading(false)
    }).catch(err => {
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
   
  
    if (scrollTop + clientHeight >= scrollHeight - 100 && location.pathname === `/users/${profileId}`) {
      setIsLoading(true)
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    resetState()
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);



  const addVideo = async (formData, setUploadProgress) => {
    try {
      const newVideo = await videoServices.upload(formData, setUploadProgress);

      newVideo.owner = { _id: userId, username, email, avatar }

      dispatch({
        type: 'ADD_VIDEO',
        video: newVideo,
      });
    } catch (error) {
      console.error("Failed to add video:", error);
    }
  };

  const deleteVideo = (videoId) => {
    videoServices.removeVideo(videoId);
    dispatch({
      type: 'DELETE_VIDEO',
      videoId,
    });
  };

  const editVideo = async (videoId, videoData) => {
    try {
      const updatedVideo = await videoServices.editVideo(videoId, videoData);
      dispatch({
        type: 'EDIT_VIDEO',
        video: updatedVideo,
        videoId,
      });
    } catch (err) {
      console.log("Failed to edit video:", err);
    }
  };

  const changeOwnerVideoAvatar = (userData) => {
    debugger
    try {
      dispatch({
        type: 'CHANGE_OWNER_VIDEOS_AVATAR',
        userData: userData,
      });
    } catch (err) {
      console.log("Failed to change avatar:", err);
    }
  };




  const likeVideo = async (videoId, userId) => {
    await videoServices.likeVideo(videoId, userId).then(() => {
      dispatch({
        type:'LIKE_VIDEO',
        videoId, userId
      });
    });
  };

  const dislikeVideo = async (videoId, userId) => {
    debugger
    await videoServices.dislikeVideo(videoId, userId).then(() => {

      dispatch({
        type: 'DISLIKE_VIDEO',
        videoId, userId
      });
    });
  };

  const followUser = (userIdToFollow) => {
    dispatch({
      type: 'FOLLOW_USER',
      userIdToFollow,
      userId,
    });
  };

  const unfollowUser = (userIdToUnfollow) => {
    dispatch({
      type: 'UNFOLLOW_USER',
      userIdToUnfollow,
      userId,
    });
  };




  const resetState = () => {
    videoServices.resetUserVideos();
    dispatch({
      type: 'RESET',
    });
    setPage(1);
  };

  return (
    <UserVideosContext.Provider value={{ videos, addVideo, deleteVideo, editVideo, changeOwnerVideoAvatar, isLoading, likeVideo, dislikeVideo ,followUser
      ,unfollowUser }}>
      {children}
    </UserVideosContext.Provider>
  );
};
