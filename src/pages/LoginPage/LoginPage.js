import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  color: red;
`;

const FormContainer = styled.div`
  width: 30%;
  margin: 0 auto;
  border: 1px solid #444444;
  margin-top: 60px;
  border-radius: 6px;
  padding: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
  text-align: center;
  color: #444444;

  & input {
    padding: 6px;
  }
`;

const FormTitle = styled.div`
  font-size: 26px;
`;

const FormButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  margin: 0 auto;
  display: flex;
  cursor: pointer;
  background: #dddddd;
  border: 1px solid #444444;
  border-radius: 3px;
`;

const LoginContent = styled.div`
  margin: 26px;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <FormTitle>登入</FormTitle>
        <LoginContent>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LoginContent>
        <LoginContent>
          Password :{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginContent>
        <FormButton type="submit">登入</FormButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </form>
  );
}
