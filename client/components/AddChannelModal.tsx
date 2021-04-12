import { useRouter } from 'next/router';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useCreateChannelMutation } from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import useForm from '../src/utils/useForm';
import {
  FormStyles,
  InputStyles,
  ButtonStyle,
  ErrorMessage,
  HeaderHero,
  HeaderHeroWrapper,
  PageHeader,
  SlackIconStyles,
} from './styles/shared';
const SlackIcon = require('../asset/slack.svg') as string;
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
  max-height: 450px;
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
    color: #4a154b;
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
    description: '',
  });

  const [createChannelMutation, { loading, error }] = useCreateChannelMutation({
    variables: {
      teamId,
      name: inputs.name as any,
      description: inputs.description as any,
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
          <HeaderHeroWrapper>
            <SlackIconStyles src={SlackIcon} alt="slack icon" />
            <HeaderHero>SlackIt</HeaderHero>
          </HeaderHeroWrapper>
          <PageHeader>Create a channel</PageHeader>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <FormStyles onSubmit={handleSubmit}>
            <InputStyles
              type="text"
              name="name"
              placeholder="Channel name"
              value={inputs.name}
              onChange={handleChange}
              required
            />
            <InputStyles
              type="text"
              name="description"
              placeholder="Channel description"
              value={inputs.description}
              onChange={handleChange}
              required
            />
            <ButtonStyle type="submit" disabled={loading}>
              CREATE CHANNEL
            </ButtonStyle>
          </FormStyles>
          <ClosedModalButton onClick={closeModal}>x</ClosedModalButton>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddChannelModal;
