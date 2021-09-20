import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getPosts, getPostsLimit } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Post from "../../Components/Post";

const ListContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  border: 1px solid #444444;
  margin-top: 60px;
  border-radius: 6px;
  padding: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
  position: relative;
`;

const PaginationButton = styled.div`
  position: absolute;
  right: 60px;
  bottom: 16px;
`;

const BackPage = styled.button`
  cursor: pointer;
`;
const CurrentPage = styled.span`
  font-size: 20px;
  height: 30px;
  margin-left: 4px;
  padding: 6px;
`;
const NextPage = styled.button`
  margin-left: 4px;
  cursor: pointer;
`;

const PaginationInfo = styled.div`
  font-size: 16px;
`;

export default function ListPage() {
  const { setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const postLimit = 5;

  useEffect(() => {
    const getListPage = async () => {
      setIsLoading(true);
      const data = await getPostsLimit(postLimit, currentPagination);
      setPosts(data);

      const totalPosts = await getPosts();
      setTotalPage(Math.ceil((totalPosts.length - 1) / 5));
      setIsLoading(false);
    };

    getListPage();
  }, [setIsLoading, currentPagination, totalPage]);

  const handleBackPageClick = () => {
    if (currentPagination > 1) {
      setCurrentPagination(currentPagination - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPagination <= totalPage) {
      setCurrentPagination(currentPagination + 1);
    }
  };
  return (
    <ListContainer>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PaginationInfo>目前總共有： {totalPage} 頁</PaginationInfo>
      <PaginationButton>
        <BackPage onClick={handleBackPageClick}>＜</BackPage>
        <CurrentPage>{currentPagination}</CurrentPage>
        <NextPage onClick={handleNextPageClick}>＞</NextPage>
      </PaginationButton>
    </ListContainer>
  );
}
