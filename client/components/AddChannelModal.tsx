import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IShowModal, Dispatcher } from '../src/utils/types';

interface AddChannelModelProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>
}

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  max-width: 550px;
  max-height: 375px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  animation: 1s ${FadeIn} ease-in;
  z-index: 1000;
`;

export const ClosedModalButton = styled.button`
  background: none;
  border: none;
  outline: none;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 24px;
  width: 24px;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const AddChannelModal: React.FC<AddChannelModelProps> = ({
  showModal,
  setShowModal,
}: IShowModal) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <ModalWrapper>
          <h1>Add Channel</h1>
          <form>
            <input type="text" placeholder="Channel name..." />
            <button>Submit</button>
          </form>
          <ClosedModalButton onClick={closeModal}>x</ClosedModalButton>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddChannelModal;
