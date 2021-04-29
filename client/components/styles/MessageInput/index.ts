import styled from "styled-components";

export const FormMessageContainer = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export const FormMessageStyles = styled.form`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const MessageInputStyles = styled.input`
  width: 80%;
  overflow: auto;
  height: 2.5rem;
  text-indent: 10px;
  border: 1px solid grey;
  border-right: none;
  border-left: none;
  &:focus {
    outline: none;
  }
`;

export const SendbuttonStyles = styled.button`
  padding: 11.5px;
  background-color: var(--white);
  outline: none;
  border: 1px solid grey;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 3px;
  &:hover:not([disabled]) {
    background-color: var(--darkPurple);
    i {
      color: var(--white);
    }
  }
`;

export const UploadButtonStyles = styled.button`
  padding: 11.5px;
  background-color: var(--white);
  outline: none;
  border: 1px solid grey;
  border-right: none;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 3px;
  &:hover:not([disabled]) {
    background-color: var(--darkPurple);
    i {
      color: var(--white);
    }
  }
`;
