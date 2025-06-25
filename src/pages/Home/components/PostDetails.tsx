import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const {  postId } = useParams();
    return <Box>PostDetails {postId}</Box>;
};

export default PostDetails;
