import { createContext, useContext } from "react";
import useComments from "../hooks/useComments";

const CommentsContext = createContext();
export const useCommentsContext = () => useContext(CommentsContext);
const CommnentsProvider = ({ children, videoId }) => {
    const comments = useComments(videoId)

    return (
        <CommentsContext.Provider value={comments}>
            {children}
        </CommentsContext.Provider>

    )
}

export default  CommnentsProvider;