import React, { useRef } from 'react';
import styled from 'styled-components';
import { useCreateMessageMutation } from '../src/generated/graphql';
import useForm from '../src/utils/useForm';

interface MessageInputProps {
  channelId: number;
  channelName: string;
}

const FormContainer = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const FormStyles = styled.form`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const InputStyles = styled.input`
  width: 80%;
  overflow: auto;
  height: 2.5rem;
  text-indent: 10px;
  border: 1px solid grey;
  border-right: none;
  border-left: none;
`;

const SendbuttonStyles = styled.button`
  padding: 11.5px;
  background-color: #fff;
  outline: none;
  border: 1px solid grey;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 3px;
  &:hover:not([disabled]) {
    background-color: #4a154b;
    i {
      color: #fff;
    }
  }
`;

const UploadButtonStyles = styled.button`
  padding: 11.5px;
  background-color: #fff;
  outline: none;
  border: 1px solid grey;
  border-right: none;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 3px;
  &:hover:not([disabled]) {
    background-color: #4a154b;
    i {
      color: #fff;
    }
  }
`;

const MessageInput: React.FC<MessageInputProps> = ({
  channelId,
  channelName,
}) => {
  const { inputs, handleChange, clearForm } = useForm({
    text: '',
    image: null,
  });

  const [createMessageMutation, { error }] = useCreateMessageMutation({
    variables: {
      channelId,
      text: inputs.text as string,
      image: inputs.image || '',
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getChannelMessages' });
    },
  });

  const uploadRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createMessageMutation().catch((err) =>
      console.error(err)
    );
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
    <FormContainer>
      {error && <h2>{error.message}</h2>}
      <FormStyles onSubmit={handleSubmit}>
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
        <InputStyles
          type="textarea"
          name="text"
          placeholder={`Message # ${channelName}`}
          onChange={handleChange}
          value={inputs.text}
        />
        <SendbuttonStyles
          type="submit"
          disabled={!inputs.text && !inputs.image}
        >
          <i className="fas fa-paper-plane fa-lg" />
        </SendbuttonStyles>
      </FormStyles>
    </FormContainer>
  );
};

export default MessageInput;
