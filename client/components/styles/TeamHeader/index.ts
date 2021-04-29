import styled from "styled-components";

export const TeadHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-bottom: 1rem;
`;

export const TeamNameHeader = styled.h1`
  font-size: 2rem;
  color: var(--white);
`;

export const DisplayButtonIcon = styled.button`
  font-size: 1rem;
  padding: 2px 5px;
  color: var(--offWhite);
  background-color: var(--purple);
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: var(--white);
    color: var(--purple);
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
  background-color: var(--purple);
  border: 1px solid var(--white);
  color: var(--white);
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: var(--white);
    color: var(--purple);
  }
`;

export const UsernameHeader = styled.h3`
  color: var(--offWhite);
`;
