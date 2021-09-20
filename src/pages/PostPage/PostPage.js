import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getPost, deletePost } from "../../WebAPI";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext, LoadingContext } from "../../contexts";

const PostContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  border: 1px solid #444444;
  margin-top: 60px;
  border-radius: 6px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
  position: relative;
`;

const PostTitle = styled.h1`
  color: #666666;
`;

const PostText = styled.div`
  font-size: 20px;
  word-wrap: break-word;
  word-break: break-all;
  border-bottom: 1px solid #444444;
  padding: 20px;
`;

const PostButton = styled.div`
  margin-top: 28px;
  position: absolute;
  right: 20px;
  bottom: 16px;
`;

const DeletePost = styled.button`
  border: 1px solid #444444;
  padding: 16px;
  text-decoration: none;
  border-radius: 6px;
  color: #444444;
  cursor: pointer;
`;

const BackButton = styled(Link)`
  padding: 12px;
  text-decoration: none;
  color: #444444;
`;

const PostAuthor = styled.div``;

const PostDate = styled.div``;

const PostInfo = styled.div`
  padding: 20px;
  color: #888888;
`;

export default function PostPage() {
  const { id } = useParams();
  const { setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [author, setAuthor] = useState();
  const history = useHistory();

  useEffect(() => {
    const getSinglePost = async () => {
      setIsLoading(true);
      const data = await getPost(id);
      setPost(data);
      setAuthor(data.user);
      setIsLoading(false);
    };

    getSinglePost();
  }, [setIsLoading, id]);

  const handleDeleteClick = () => {
    deletePost(id).then(() => {
      history.push("/list");
    });
  };

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostText>{post.body}</PostText>
      <PostInfo>
        <PostAuthor>文章作者：{author && author.nickname}</PostAuthor>
        <PostDate>
          發布時間：{new Date(post.createdAt).toLocaleString()}
        </PostDate>
      </PostInfo>
      <PostButton>
        {user && author && user.username === author.username ? (
          <DeletePost onClick={handleDeleteClick}>刪除文章</DeletePost>
        ) : (
          <BackButton to="/">回到首頁</BackButton>
        )}
      </PostButton>
    </PostContainer>
  );
}
