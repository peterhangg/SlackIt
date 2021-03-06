import React from 'react';
import { useRouter } from 'next/router';
import { useCreateChannelMutation } from '../src/generated/graphql';
import { Dispatcher, ICreateChannel } from '../src/utils/types';
import useForm from '../src/utils/useForm';
import {
  FormStyles,
  InputStyles,
  ButtonStyle,
  ErrorMessage,
  PageHeader,
  SlackIconStyles,
  LogoHeader,
  LogoWrapper,
} from './styles/shared';
import { ClosedModalButton, ModalWrapper } from './styles/ChannelModal';
import SlackIcon from '../asset/slack.svg';
interface AddChannelModelProps {
  teamId: number;
  showModal: boolean;
  setShowModal: Dispatcher<boolean>;
}

const AddChannelModal: React.FC<AddChannelModelProps> = ({
  showModal,
  setShowModal,
  teamId,
}) => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm<ICreateChannel>({
    name: '',
    description: '',
  });

  const [createChannelMutation, { loading, error }] = useCreateChannelMutation({
    variables: {
      teamId,
      name: inputs.name,
      description: inputs.description,
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getChannel' }),
        cache.evict({ fieldName: 'getTeam' });
      cache.evict({ fieldName: 'getChannelMessages' });
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
          <LogoWrapper>
            <SlackIconStyles src={SlackIcon} alt="slack icon" />
            <LogoHeader>SlackIt</LogoHeader>
          </LogoWrapper>
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
