import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useCreateDirectMessageMutation,
  useCreateMessageMutation,
} from '../src/generated/graphql';
import useForm from '../src/utils/useForm';
import {
  UploadButtonStyles,
  MessageInputStyles,
  SendbuttonStyles,
  FormMessageContainer,
  FormMessageStyles,
} from './styles/MessageInput';

interface MessageInputProps {
  channelId: number;
  channelName: string;
  teamId: number;
  username: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  channelId,
  channelName,
  teamId,
  username,
}) => {
  const router = useRouter();
  const uploadRef = useRef(null);
  const receiverId = parseInt(router.query.userId as string);
  const { inputs, handleChange, clearForm } = useForm({
    text: '',
    image: null,
  });

  const [createMessageMutation, { error }] = useCreateMessageMutation({
    variables: {
      channelId,
      text: inputs.text,
      image: inputs.image || '',
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getChannelMessages' });
    },
  });

  const [
    createDirectMessage,
    { error: DirectMessageError },
  ] = useCreateDirectMessageMutation({
    variables: {
      teamId,
      receiverId,
      text: inputs.text,
      image: inputs.image || '',
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getDirectMessages' });
      cache.evict({ fieldName: 'directMessageUsers' });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response: any;

    if (receiverId) {
      response = await createDirectMessage().catch((err) => console.error(err));
    } else {
      response = await createMessageMutation().catch((err) =>
        console.error(err)
      );
    }
    if (!response) {
      return;
    }
    uploadRef.current.value = '';
    clearForm();
  };

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  return (
    <FormMessageContainer>
      {error ||
        (DirectMessageError && (
          <h2>{error.message || DirectMessageError.message}</h2>
        ))}
      <FormMessageStyles onSubmit={handleSubmit}>
        <>
          <UploadButtonStyles type="button" onClick={handleUploadClick}>
            <i className="fas fa-upload fa-lg" />
          </UploadButtonStyles>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            ref={uploadRef}
            style={{ display: 'none' }}
          />
        </>
        <MessageInputStyles
          type="textarea"
          name="text"
          placeholder={
            !receiverId ? `Message # ${channelName}` : `Message # ${username}`
          }
          onChange={handleChange}
          value={inputs.text}
        />
        <SendbuttonStyles
          type="submit"
          disabled={!inputs.text && !inputs.image}
        >
          <i className="fas fa-paper-plane fa-lg" />
        </SendbuttonStyles>
      </FormMessageStyles>
    </FormMessageContainer>
  );
};

export default MessageInput;
