import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  PageContainer,
  SlackIconStyles,
  PageHeader,
  ErrorMessage,
  FormStyles,
  InputStyles,
  ButtonStyle,
  LogoHeader,
  LogoWrapper,
  FormMessage,
  FormMessageLink,
} from '../../components/styles/shared';
import { withApollo } from '../../src/apollo/withApollo';
import {
  useEditUserMutation,
  useGetMeQuery,
} from '../../src/generated/graphql';
import useForm from '../../src/utils/useForm';
import { useIsAuthenticated } from '../../src/utils/useIsAuthenticated';
import {
  AvatarWrapper,
  AvatarStyles,
  UserIconWrapper,
  UserIcon,
  UploadButtonStyles,
} from '../../components/styles/EditProfile';
import { IEditProfile } from '../../src/utils/types';
import SlackIcon from '../../asset/slack.svg';

const EditProfile: React.FC = ({}) => {
  useIsAuthenticated();
  const { data } = useGetMeQuery();
  const router = useRouter();
  const uploadRef = useRef(null);
  const [avatar, setAvatar] = useState<String | ArrayBuffer>(null);
  const { inputs, handleChange } = useForm<IEditProfile>({
    username: data?.getMe.username,
    password: '',
    newPassword: '',
    image: null,
  });

  // Set avatar on mount
  useEffect(() => {
    setAvatar(data?.getMe.avatar);
  }, []);

  const [editUserMutation, { loading, error }] = useEditUserMutation({
    variables: {
      username: inputs.username,
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
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader>SlackIt</LogoHeader>
      </LogoWrapper>
      <PageHeader>Edit Your Profile</PageHeader>
      {avatar ? (
        <AvatarWrapper>
          <AvatarStyles src={avatar as string} alt="profile avatar" />
        </AvatarWrapper>
      ) : (
        <UserIconWrapper>
          <UserIcon>{data?.getMe.username.charAt(0).toUpperCase()}</UserIcon>
        </UserIconWrapper>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={inputs.username}
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
          <UploadButtonStyles type="button" onClick={handleUploadClick}>
            ADD AVATAR
          </UploadButtonStyles>
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
        <FormMessage>
          Back to dashboard
          <NextLink href="/dashboard">
            <FormMessageLink> Click here.</FormMessageLink>
          </NextLink>
        </FormMessage>
      </FormStyles>
    </PageContainer>
  );
};

export default withApollo({ ssr: true })(EditProfile);
