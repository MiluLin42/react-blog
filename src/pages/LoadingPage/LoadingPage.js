import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  min-height: 1000px;
  margin: 0 auto;
  background: white;
`;

const LoadingText = styled.div`
  font-size: 48px;
  position: absolute;
  color: #adadad;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function LoadingPage() {
  return (
    <Container>
      <LoadingText>Loading...</LoadingText>
    </Container>
  );
}
