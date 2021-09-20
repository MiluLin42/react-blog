import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getPosts } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Post from "../../Components/Post";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getHomePage = async () => {
      setIsLoading(true);
      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    };

    getHomePage();
  }, [setIsLoading]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </Root>
  );
}
