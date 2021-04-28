import styled from "styled-components";

export const TeadHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-bottom: 1rem;
`;

export const TeamNameHeader = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

export const DisplayButtonIcon = styled.button`
  font-size: 1rem;
  padding: 2px 5px;
  color: #e5e5e5;
  background-color: #763857;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

export const TeamHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ButtonStyles = styled.button`
  margin-bottom: 5px;
  padding: 5px;
  background-color: #763857;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

export const UsernameHeader = styled.h3`
  color: #e5e5e5;
`;
