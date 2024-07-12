import { createContext, useContext, useEffect, useReducer } from "react";
import userVideoReducer from "../reducers/userVideoReducer";
import AuthContext from "./authContext";
import * as videoServices from "../services/videoServices";
import { useNavigate, useParams } from "react-router-dom";

const UserVideosContext = createContext();

export default UserVideosContext;

export const UserVideosProvider = ({ children, profileId }) => {

  const navigate = useNavigate();
  const [videos, dispatch] = useReducer(userVideoReducer, []);
  const { userId } = useContext(AuthContext);


  useEffect(() => {
    videoServices.getUserVideos(profileId).then(result => {

      dispatch({
        control: 'GET_YOUR_VIDEOS',
        video: result
      })
    })


  }, [userId])

  const addVideo = async (formData) => {
    console.log(formData);
    const newVideo = await videoServices.upload(formData, setUploadProgress)

    dispatch({
      type: 'ADD_VIDEO',
      video: newVideo,
    });
    navigate('/');

  };

  const deleteVideo = (videoId) => {
  debugger
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

    }
  };
  return (
    <UserVideosContext.Provider value={{ videos, addVideo, deleteVideo, editVideo ,changeOwnerVideoAvatar}}>
      {children}
    </UserVideosContext.Provider>
  );
};
