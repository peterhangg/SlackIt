import styled from "styled-components";

export const UserIcon = styled.div`
  font-size: 5rem;
`;

export const UserIconWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border: 1px grey solid;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

export const AvatarWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
`;

export const AvatarStyles = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const UploadButtonStyles = styled.button`
  margin-bottom: 1.5rem;
  padding: 10px 8px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid grey;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #611f69;
    color: #fff;
  }
`;