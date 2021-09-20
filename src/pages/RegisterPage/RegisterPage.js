import React, { useState, useContext } from "react";
import styled from "styled-components";
import { getMe, register } from "../../WebAPI";
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

const RegisterContent = styled.div`
  margin: 26px;
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

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
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
        <FormTitle>註冊</FormTitle>
        <RegisterContent>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </RegisterContent>
        <RegisterContent>
          Password :{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </RegisterContent>
        <RegisterContent>
          Nickname:{" "}
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </RegisterContent>
        <FormButton type="submit">註冊</FormButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </form>
  );
}
