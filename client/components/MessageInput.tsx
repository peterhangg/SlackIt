import React from 'react';
import styled from 'styled-components';
import { useCreateMessageMutation } from '../src/generated/graphql';
import useForm from '../src/utils/useForm';
interface MessageInputProps {
  channelId: number;
  channelName: string;
}

const FormContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
`;

const FormStyles = styled.form`
  width: 90%;
`;

const TextAreaStyles = styled.input`
  width: 100%;
  overflow: auto;
	height: auto;
	border-radius: 3px;
  bottom: 0;
  left: 0;
`;

const MessageInput: React.FC<MessageInputProps> = ({ channelId, channelName }) => {
  const { inputs, handleChange, resetForm } = useForm({
    text: '',
  });

  const [createMessageMutation, { error }] = useCreateMessageMutation({
    variables: {
      channelId,
      text: inputs.text as string,
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getChannel' });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createMessageMutation().catch((err) =>
      console.error(err)
    );
    if (!response) {
      return;
    }
    resetForm();
  };

  return (
    <FormContainer>
      {error && <h2>{error.message}</h2>}
      <FormStyles onSubmit={handleSubmit}>
        <TextAreaStyles
          type="textarea"
          name="text"
          placeholder={`Message # ${channelName}`}
          onChange={handleChange}
          value={inputs.text}
        />
        <button type="submit">send</button>
      </FormStyles>
    </FormContainer>
  );
};

export default MessageInput;
