import { useRouter } from 'next/router';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useCreateChannelMutation } from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import useForm from '../src/utils/useForm';
interface AddChannelModelProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>;
  teamId: number;
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
  teamId,
}) => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
  });

  const [createChannelMutation, { error }] = useCreateChannelMutation({
    variables: {
      teamId,
      name: inputs.name as any,
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getChannel' }),
        cache.evict({ fieldName: 'getTeam' });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createChannelMutation().catch((err) =>
      console.error(err)
    );
    if (!response) {
      return;
    }
    resetForm();
    const createdChannelData = response.data.createChannel;
    setShowModal(!showModal);
    router.push(`/dashboard/${teamId}/${createdChannelData.id}/`);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <ModalWrapper>
          <h1>Add Channel</h1>
          {error && <div>{error.message}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Channel name..."
              value={inputs.name}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <ClosedModalButton onClick={closeModal}>x</ClosedModalButton>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddChannelModal;