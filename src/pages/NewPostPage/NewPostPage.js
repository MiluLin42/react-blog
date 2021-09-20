import React, { useState } from "react";
import styled from "styled-components";
import { addPost } from "../../WebAPI";
import { useHistory } from "react-router-dom";
import { getAuthToken } from "../../utils";

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

const NewPostTitle = styled.input`
  font-size: 18px;
  border: 1px solid #444444;
  border-radius: 3px;
  padding: 10px;
`;

const NewPostContent = styled.textarea`
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #444444;
  border-radius: 3px;
  word-wrap: break-word;
  word-break: break-all;
`;

const PostButton = styled.button`
  margin-top: 28px;
  position: absolute;
  right: 20px;
  bottom: 16px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function PostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) return;

    if (!postTitle || !postContent) {
      return setErrorMessage("標題及內容不得為空");
    }

    addPost(token, postTitle, postContent);
    history.push("/list");
  };

  return (
    <form onSubmit={handleSubmit}>
      <PostContainer>
        <PostTitle>發布新文章</PostTitle>
        <div>
          <NewPostTitle
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="文章標題"
          />
        </div>
        <div>
          <NewPostContent
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            type="textarea"
            name="content"
            placeholder="文章內容"
            rows={5}
            cols={100}
          />
        </div>
        <PostButton type="submit">發布</PostButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </PostContainer>
    </form>
  );
}
