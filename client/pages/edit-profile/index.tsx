import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  PageContainer,
  HeaderHeroWrapper,
  SlackIconStyles,
  HeaderHero,
  PageHeader,
  ErrorMessage,
  FormStyles,
  InputStyles,
  ButtonStyle,
} from '../../components/styles/shared';
import { withApollo } from '../../src/apollo/withApollo';
import {
  useEditUserMutation,
  useGetMeQuery,
} from '../../src/generated/graphql';
import useForm from '../../src/utils/useForm';
import { useIsAuthenticated } from '../../src/utils/useIsAuthenticated';
const SlackIcon = require('../../asset/slack.svg') as string;

interface EditProfile {}

const ButtonStyles = styled.button`
  margin-bottom: 1.5rem;
  padding: 10px 8px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid grey;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #763857;
    color: #fff;
  }
`;

export const UserIcon = styled.div`
  font-size: 1.5rem;
  font-size: 5rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border: 1px grey solid;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const AvatarStyles = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const EditProfile: React.FC = ({}) => {
  useIsAuthenticated();
  const { data } = useGetMeQuery();
  const router = useRouter();
  const uploadRef = useRef(null);
  const [avatar, setAvatar] = useState<String | ArrayBuffer>(null);
  const { inputs, handleChange } = useForm({
    name: data?.getMe.username,
    password: '',
    newPassword: '',
    image: null,
  });

  useEffect(() => {
    setAvatar(data?.getMe.avatar);
  }, []);

  const [editUserMutation, { loading, error }] = useEditUserMutation({
    variables: {
      username: inputs.name,
      currentPassword: inputs.password,
      newPassword: inputs.newPassword,
      image: inputs.image,
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getMe' });
      cache.evict({ fieldName: 'getTeamUsers' });
      cache.evict({ fieldName: 'getTeam' });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await editUserMutation().catch((err) =>
      console.error(err)
    );

    if (!response) {
      return;
    }
    router.back();
  };

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    inputs.image = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <PageContainer>
      <HeaderHeroWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <HeaderHero>SlackIt</HeaderHero>
      </HeaderHeroWrapper>
      <PageHeader>Edit Your Profile</PageHeader>
      <AvatarContainer>
        {avatar ? (
          <AvatarStyles src={avatar as string}></AvatarStyles>
        ) : (
          <UserIcon>{data?.getMe.username.charAt(0).toUpperCase()}</UserIcon>
        )}
      </AvatarContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type="text"
          name="name"
          placeholder="username"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <InputStyles
          type="password"
          name="password"
          placeholder="current password"
          onChange={handleChange}
          value={inputs.password}
          required
        />
        <InputStyles
          type="password"
          name="newPassword"
          placeholder="new password"
          onChange={handleChange}
          value={inputs.newPassword}
        />
        <>
          <ButtonStyles type="button" onClick={handleUploadClick}>
            ADD AVATAR
          </ButtonStyles>
          <input
            type="file"
            name="image"
            id="image"
            onChange={imageHandler}
            ref={uploadRef}
            style={{ display: 'none' }}
          />
        </>
        <ButtonStyle type="submit" disabled={loading}>
          UPDATE PROFILE
        </ButtonStyle>
      </FormStyles>
    </PageContainer>
  );
};

export default withApollo({ ssr: true })(EditProfile);
