import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 40%;
  margin: 0 auto;
  margin-top: 60px;
  border: 1px solid #444444;
  border-radius: 6px;
  padding: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
  position: relative;
`;

const BlogDesc = styled.div`
  font-size: 18px;
  text-align: center;
`

const BackButton = styled(Link)`
  padding: 12px;
  text-decoration: none;
  color: #666666;
  position: absolute;
  right: 6px;
  bottom: 6px;
`;

const Title = styled.h1`
  text-align: center;
`


export default function ListPage() {
  
  return (
    <Container>
      <Title>歡迎加入我們！</Title>
      <BlogDesc>
        在這邊你可以看到不同作者寫的文章<br />
        你也想要發表自己的想法以及意見嗎？<br />
        歡迎註冊成為我們的一份子！
        </BlogDesc>
      <BackButton to="/">回到首頁</BackButton>
    </Container>
  );
}
