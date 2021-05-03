import styled from "styled-components";

export const TeamListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  min-width: 400px;
  max-height: 600px;
  height: 100%;
  overflow-y: auto;
`;

export const TeamListItems = styled.li`
  width: 100%;
  text-align: center;
  margin-bottom: 2px;
  padding: 15px 10px;
  transition: ease-out background-color 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;