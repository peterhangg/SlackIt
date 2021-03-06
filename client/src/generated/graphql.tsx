import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getUser: User;
  getAllUsers: Array<User>;
  getMe?: Maybe<User>;
  getAllTeams: Array<Team>;
  getTeam: Team;
  getUserTeams: Array<Team>;
  getTeamUsers: Array<User>;
  getChannel: Channel;
  getTeamChannels: Array<Channel>;
  getChannelMessages: PaginatedMessages;
  getDirectMessages: Array<DirectMessage>;
  directMessageUsers?: Maybe<Array<User>>;
};


export type QueryGetUserArgs = {
  userId: Scalars['Float'];
};


export type QueryGetAllTeamsArgs = {
  searchTeam?: Maybe<Scalars['String']>;
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetTeamUsersArgs = {
  searchMember?: Maybe<Scalars['String']>;
  teamId: Scalars['Float'];
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetTeamChannelsArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetChannelMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  channelId: Scalars['Float'];
};


export type QueryGetDirectMessagesArgs = {
  receiverId: Scalars['Float'];
  teamId: Scalars['Float'];
};


export type QueryDirectMessageUsersArgs = {
  teamId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  messages: Array<Message>;
  teams?: Maybe<Array<Team>>;
  teamsOwned?: Maybe<Array<Team>>;
  directMessages: Array<DirectMessage>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  user: User;
  channel: Channel;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  messages?: Maybe<Array<Message>>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
  owner: User;
  channels: Array<Channel>;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  id: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  teamId: Scalars['Float'];
  receiverId: Scalars['Float'];
  senderId: Scalars['Float'];
  creator: User;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<Message>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  logout: Scalars['Boolean'];
  editUser: User;
  createTeam: Team;
  joinTeam: Team;
  deleteTeam: Scalars['Boolean'];
  leaveTeam: Scalars['Boolean'];
  createChannel: Channel;
  deleteChannel: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  editMessage: Message;
  createDirectMessage: DirectMessage;
  deleteDirectMessage: Scalars['Boolean'];
  editDirectMessage: DirectMessage;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEditUserArgs = {
  image?: Maybe<Scalars['Upload']>;
  newPassword?: Maybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinTeamArgs = {
  teamId: Scalars['Float'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Float'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['Float'];
};


export type MutationCreateChannelArgs = {
  teamId: Scalars['Float'];
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Float'];
  image?: Maybe<Scalars['Upload']>;
  text: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Float'];
};


export type MutationEditMessageArgs = {
  text: Scalars['String'];
  messageId: Scalars['Float'];
};


export type MutationCreateDirectMessageArgs = {
  image?: Maybe<Scalars['Upload']>;
  receiverId: Scalars['Float'];
  teamId: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationDeleteDirectMessageArgs = {
  directMessageId: Scalars['Float'];
};


export type MutationEditDirectMessageArgs = {
  text: Scalars['String'];
  directMessageId: Scalars['Float'];
};


export type Subscription = {
  __typename?: 'Subscription';
  joinedTeam: User;
  leftTeam: User;
  addedChannel: Channel;
  newMessage: Message;
  removeMessage: Message;
  editedMessage: Message;
  teamNotification: Message;
  newDirectMessage: DirectMessage;
  removeDirectMessage: DirectMessage;
  editedDirectMessage: DirectMessage;
};


export type SubscriptionJoinedTeamArgs = {
  teamId: Scalars['Float'];
};


export type SubscriptionLeftTeamArgs = {
  teamId: Scalars['Float'];
};


export type SubscriptionAddedChannelArgs = {
  teamId: Scalars['Float'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionRemoveMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionEditedMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionTeamNotificationArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionNewDirectMessageArgs = {
  teamId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type SubscriptionRemoveDirectMessageArgs = {
  teamId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type SubscriptionEditedDirectMessageArgs = {
  teamId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type CreateChannelMutationVariables = Exact<{
  teamId: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'description'>
  ) }
);

export type CreateDirectMessageMutationVariables = Exact<{
  teamId: Scalars['Float'];
  receiverId: Scalars['Float'];
  text: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreateDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & { createDirectMessage: (
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'teamId' | 'receiverId' | 'senderId'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type DeleteDirectMessageMutationVariables = Exact<{
  directMessageId: Scalars['Float'];
}>;


export type DeleteDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDirectMessage'>
);

export type EditDirectMessageMutationVariables = Exact<{
  directMessageId: Scalars['Float'];
  text: Scalars['String'];
}>;


export type EditDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & { editDirectMessage: (
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['Float'];
  text: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Float'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type EditMessageMutationVariables = Exact<{
  messageId: Scalars['Float'];
  text: Scalars['String'];
}>;


export type EditMessageMutation = (
  { __typename?: 'Mutation' }
  & { editMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name'>
    )> }
  ) }
);

export type JoinTeamMutationVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type JoinTeamMutation = (
  { __typename?: 'Mutation' }
  & { joinTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type LeaveTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveTeam'>
);

export type EditUserMutationVariables = Exact<{
  username: Scalars['String'];
  currentPassword: Scalars['String'];
  newPassword?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'createdAt'>
  ) }
);

export type GetChannelQueryVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type GetChannelQuery = (
  { __typename?: 'Query' }
  & { getChannel: (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'description'>
  ) }
);

export type GetTeamChannelsQueryVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type GetTeamChannelsQuery = (
  { __typename?: 'Query' }
  & { getTeamChannels: Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name'>
  )> }
);

export type DirectMessageUsersQueryVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type DirectMessageUsersQuery = (
  { __typename?: 'Query' }
  & { directMessageUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>> }
);

export type GetDirectMessagesQueryVariables = Exact<{
  receiverId: Scalars['Float'];
  teamId: Scalars['Float'];
}>;


export type GetDirectMessagesQuery = (
  { __typename?: 'Query' }
  & { getDirectMessages: Array<(
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  )> }
);

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Float'];
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetChannelMessagesQuery = (
  { __typename?: 'Query' }
  & { getChannelMessages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'createdAt' | 'updatedAt' | 'image'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type GetAllTeamsQueryVariables = Exact<{
  searchTeam: Scalars['String'];
}>;


export type GetAllTeamsQuery = (
  { __typename?: 'Query' }
  & { getAllTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'description'>
  )> }
);

export type GetTeamQueryVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type GetTeamQuery = (
  { __typename?: 'Query' }
  & { getTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name'>
    )>, users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type GetTeamUsersQueryVariables = Exact<{
  teamId: Scalars['Float'];
  searchMember?: Maybe<Scalars['String']>;
}>;


export type GetTeamUsersQuery = (
  { __typename?: 'Query' }
  & { getTeamUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);

export type GetUserTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTeamsQuery = (
  { __typename?: 'Query' }
  & { getUserTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name'>
    )> }
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar'>
  )> }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { getMe?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar'>
    & { teams?: Maybe<Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'description'>
      & { channels: Array<(
        { __typename?: 'Channel' }
        & Pick<Channel, 'id' | 'name'>
      )> }
    )>> }
  )> }
);

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar'>
  ) }
);

export type AddedChannelSubscriptionVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type AddedChannelSubscription = (
  { __typename?: 'Subscription' }
  & { addedChannel: (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'description'>
  ) }
);

export type EditedDirectMessageSubscriptionVariables = Exact<{
  userId: Scalars['Float'];
  teamId: Scalars['Float'];
}>;


export type EditedDirectMessageSubscription = (
  { __typename?: 'Subscription' }
  & { editedDirectMessage: (
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type NewDirectMessageSubscriptionVariables = Exact<{
  userId: Scalars['Float'];
  teamId: Scalars['Float'];
}>;


export type NewDirectMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newDirectMessage: (
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type RemoveDirectMessageSubscriptionVariables = Exact<{
  teamId: Scalars['Float'];
  userId: Scalars['Float'];
}>;


export type RemoveDirectMessageSubscription = (
  { __typename?: 'Subscription' }
  & { removeDirectMessage: (
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'image' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type EditedMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type EditedMessageSubscription = (
  { __typename?: 'Subscription' }
  & { editedMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type RemoveMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type RemoveMessageSubscription = (
  { __typename?: 'Subscription' }
  & { removeMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type TeamNotificationSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type TeamNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { teamNotification: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type JoinedTeamSubscriptionVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type JoinedTeamSubscription = (
  { __typename?: 'Subscription' }
  & { joinedTeam: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type LeftTeamSubscriptionVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type LeftTeamSubscription = (
  { __typename?: 'Subscription' }
  & { leftTeam: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);


export const CreateChannelDocument = gql`
    mutation CreateChannel($teamId: Float!, $name: String!, $description: String!) {
  createChannel(teamId: $teamId, name: $name, description: $description) {
    id
    name
    description
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateDirectMessageDocument = gql`
    mutation CreateDirectMessage($teamId: Float!, $receiverId: Float!, $text: String!, $image: Upload) {
  createDirectMessage(
    teamId: $teamId
    receiverId: $receiverId
    text: $text
    image: $image
  ) {
    id
    text
    image
    teamId
    receiverId
    senderId
    creator {
      id
      username
    }
  }
}
    `;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      receiverId: // value for 'receiverId'
 *      text: // value for 'text'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>(CreateDirectMessageDocument, options);
      }
export type CreateDirectMessageMutationHookResult = ReturnType<typeof useCreateDirectMessageMutation>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const DeleteDirectMessageDocument = gql`
    mutation DeleteDirectMessage($directMessageId: Float!) {
  deleteDirectMessage(directMessageId: $directMessageId)
}
    `;
export type DeleteDirectMessageMutationFn = Apollo.MutationFunction<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;

/**
 * __useDeleteDirectMessageMutation__
 *
 * To run a mutation, you first call `useDeleteDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDirectMessageMutation, { data, loading, error }] = useDeleteDirectMessageMutation({
 *   variables: {
 *      directMessageId: // value for 'directMessageId'
 *   },
 * });
 */
export function useDeleteDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>(DeleteDirectMessageDocument, options);
      }
export type DeleteDirectMessageMutationHookResult = ReturnType<typeof useDeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationResult = Apollo.MutationResult<DeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationOptions = Apollo.BaseMutationOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;
export const EditDirectMessageDocument = gql`
    mutation EditDirectMessage($directMessageId: Float!, $text: String!) {
  editDirectMessage(directMessageId: $directMessageId, text: $text) {
    id
    text
    image
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
}
    `;
export type EditDirectMessageMutationFn = Apollo.MutationFunction<EditDirectMessageMutation, EditDirectMessageMutationVariables>;

/**
 * __useEditDirectMessageMutation__
 *
 * To run a mutation, you first call `useEditDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDirectMessageMutation, { data, loading, error }] = useEditDirectMessageMutation({
 *   variables: {
 *      directMessageId: // value for 'directMessageId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditDirectMessageMutation, EditDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditDirectMessageMutation, EditDirectMessageMutationVariables>(EditDirectMessageDocument, options);
      }
export type EditDirectMessageMutationHookResult = ReturnType<typeof useEditDirectMessageMutation>;
export type EditDirectMessageMutationResult = Apollo.MutationResult<EditDirectMessageMutation>;
export type EditDirectMessageMutationOptions = Apollo.BaseMutationOptions<EditDirectMessageMutation, EditDirectMessageMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($channelId: Float!, $text: String!, $image: Upload) {
  createMessage(channelId: $channelId, text: $text, image: $image)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      text: // value for 'text'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Float!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($messageId: Float!, $text: String!) {
  editMessage(messageId: $messageId, text: $text) {
    id
    text
    updatedAt
    user {
      id
      username
    }
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $description: String!) {
  createTeam(name: $name, description: $description) {
    id
    name
    channels {
      id
      name
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const JoinTeamDocument = gql`
    mutation JoinTeam($teamId: Float!) {
  joinTeam(teamId: $teamId) {
    id
    name
  }
}
    `;
export type JoinTeamMutationFn = Apollo.MutationFunction<JoinTeamMutation, JoinTeamMutationVariables>;

/**
 * __useJoinTeamMutation__
 *
 * To run a mutation, you first call `useJoinTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTeamMutation, { data, loading, error }] = useJoinTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useJoinTeamMutation(baseOptions?: Apollo.MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinTeamMutation, JoinTeamMutationVariables>(JoinTeamDocument, options);
      }
export type JoinTeamMutationHookResult = ReturnType<typeof useJoinTeamMutation>;
export type JoinTeamMutationResult = Apollo.MutationResult<JoinTeamMutation>;
export type JoinTeamMutationOptions = Apollo.BaseMutationOptions<JoinTeamMutation, JoinTeamMutationVariables>;
export const LeaveTeamDocument = gql`
    mutation LeaveTeam($teamId: Float!) {
  leaveTeam(teamId: $teamId)
}
    `;
export type LeaveTeamMutationFn = Apollo.MutationFunction<LeaveTeamMutation, LeaveTeamMutationVariables>;

/**
 * __useLeaveTeamMutation__
 *
 * To run a mutation, you first call `useLeaveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTeamMutation, { data, loading, error }] = useLeaveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLeaveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(LeaveTeamDocument, options);
      }
export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>;
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>;
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($username: String!, $currentPassword: String!, $newPassword: String, $image: Upload) {
  editUser(
    username: $username
    currentPassword: $currentPassword
    newPassword: $newPassword
    image: $image
  ) {
    id
    username
    avatar
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    username
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
    username
    email
    createdAt
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetChannelDocument = gql`
    query GetChannel($channelId: Float!) {
  getChannel(channelId: $channelId) {
    id
    name
    description
  }
}
    `;

/**
 * __useGetChannelQuery__
 *
 * To run a query within a React component, call `useGetChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelQuery(baseOptions: Apollo.QueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, options);
      }
export function useGetChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, options);
        }
export type GetChannelQueryHookResult = ReturnType<typeof useGetChannelQuery>;
export type GetChannelLazyQueryHookResult = ReturnType<typeof useGetChannelLazyQuery>;
export type GetChannelQueryResult = Apollo.QueryResult<GetChannelQuery, GetChannelQueryVariables>;
export const GetTeamChannelsDocument = gql`
    query GetTeamChannels($teamId: Float!) {
  getTeamChannels(teamId: $teamId) {
    id
    name
  }
}
    `;

/**
 * __useGetTeamChannelsQuery__
 *
 * To run a query within a React component, call `useGetTeamChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamChannelsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamChannelsQuery(baseOptions: Apollo.QueryHookOptions<GetTeamChannelsQuery, GetTeamChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamChannelsQuery, GetTeamChannelsQueryVariables>(GetTeamChannelsDocument, options);
      }
export function useGetTeamChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamChannelsQuery, GetTeamChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamChannelsQuery, GetTeamChannelsQueryVariables>(GetTeamChannelsDocument, options);
        }
export type GetTeamChannelsQueryHookResult = ReturnType<typeof useGetTeamChannelsQuery>;
export type GetTeamChannelsLazyQueryHookResult = ReturnType<typeof useGetTeamChannelsLazyQuery>;
export type GetTeamChannelsQueryResult = Apollo.QueryResult<GetTeamChannelsQuery, GetTeamChannelsQueryVariables>;
export const DirectMessageUsersDocument = gql`
    query DirectMessageUsers($teamId: Float!) {
  directMessageUsers(teamId: $teamId) {
    id
    username
  }
}
    `;

/**
 * __useDirectMessageUsersQuery__
 *
 * To run a query within a React component, call `useDirectMessageUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectMessageUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectMessageUsersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDirectMessageUsersQuery(baseOptions: Apollo.QueryHookOptions<DirectMessageUsersQuery, DirectMessageUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DirectMessageUsersQuery, DirectMessageUsersQueryVariables>(DirectMessageUsersDocument, options);
      }
export function useDirectMessageUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectMessageUsersQuery, DirectMessageUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DirectMessageUsersQuery, DirectMessageUsersQueryVariables>(DirectMessageUsersDocument, options);
        }
export type DirectMessageUsersQueryHookResult = ReturnType<typeof useDirectMessageUsersQuery>;
export type DirectMessageUsersLazyQueryHookResult = ReturnType<typeof useDirectMessageUsersLazyQuery>;
export type DirectMessageUsersQueryResult = Apollo.QueryResult<DirectMessageUsersQuery, DirectMessageUsersQueryVariables>;
export const GetDirectMessagesDocument = gql`
    query GetDirectMessages($receiverId: Float!, $teamId: Float!) {
  getDirectMessages(receiverId: $receiverId, teamId: $teamId) {
    id
    text
    image
    createdAt
    updatedAt
    creator {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useGetDirectMessagesQuery__
 *
 * To run a query within a React component, call `useGetDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirectMessagesQuery({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetDirectMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>(GetDirectMessagesDocument, options);
      }
export function useGetDirectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>(GetDirectMessagesDocument, options);
        }
export type GetDirectMessagesQueryHookResult = ReturnType<typeof useGetDirectMessagesQuery>;
export type GetDirectMessagesLazyQueryHookResult = ReturnType<typeof useGetDirectMessagesLazyQuery>;
export type GetDirectMessagesQueryResult = Apollo.QueryResult<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>;
export const GetChannelMessagesDocument = gql`
    query GetChannelMessages($channelId: Float!, $limit: Float!, $cursor: String) {
  getChannelMessages(channelId: $channelId, limit: $limit, cursor: $cursor) {
    messages {
      id
      text
      createdAt
      updatedAt
      image
      user {
        id
        username
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useGetChannelMessagesQuery__
 *
 * To run a query within a React component, call `useGetChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, options);
      }
export function useGetChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, options);
        }
export type GetChannelMessagesQueryHookResult = ReturnType<typeof useGetChannelMessagesQuery>;
export type GetChannelMessagesLazyQueryHookResult = ReturnType<typeof useGetChannelMessagesLazyQuery>;
export type GetChannelMessagesQueryResult = Apollo.QueryResult<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>;
export const GetAllTeamsDocument = gql`
    query GetAllTeams($searchTeam: String!) {
  getAllTeams(searchTeam: $searchTeam) {
    id
    name
    description
  }
}
    `;

/**
 * __useGetAllTeamsQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsQuery({
 *   variables: {
 *      searchTeam: // value for 'searchTeam'
 *   },
 * });
 */
export function useGetAllTeamsQuery(baseOptions: Apollo.QueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
      }
export function useGetAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
        }
export type GetAllTeamsQueryHookResult = ReturnType<typeof useGetAllTeamsQuery>;
export type GetAllTeamsLazyQueryHookResult = ReturnType<typeof useGetAllTeamsLazyQuery>;
export type GetAllTeamsQueryResult = Apollo.QueryResult<GetAllTeamsQuery, GetAllTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query GetTeam($teamId: Float!) {
  getTeam(teamId: $teamId) {
    id
    name
    channels {
      id
      name
    }
    users {
      id
      username
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamUsersDocument = gql`
    query GetTeamUsers($teamId: Float!, $searchMember: String) {
  getTeamUsers(teamId: $teamId, searchMember: $searchMember) {
    id
    username
    avatar
  }
}
    `;

/**
 * __useGetTeamUsersQuery__
 *
 * To run a query within a React component, call `useGetTeamUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamUsersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      searchMember: // value for 'searchMember'
 *   },
 * });
 */
export function useGetTeamUsersQuery(baseOptions: Apollo.QueryHookOptions<GetTeamUsersQuery, GetTeamUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamUsersQuery, GetTeamUsersQueryVariables>(GetTeamUsersDocument, options);
      }
export function useGetTeamUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamUsersQuery, GetTeamUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamUsersQuery, GetTeamUsersQueryVariables>(GetTeamUsersDocument, options);
        }
export type GetTeamUsersQueryHookResult = ReturnType<typeof useGetTeamUsersQuery>;
export type GetTeamUsersLazyQueryHookResult = ReturnType<typeof useGetTeamUsersLazyQuery>;
export type GetTeamUsersQueryResult = Apollo.QueryResult<GetTeamUsersQuery, GetTeamUsersQueryVariables>;
export const GetUserTeamsDocument = gql`
    query GetUserTeams {
  getUserTeams {
    id
    name
    channels {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserTeamsQuery__
 *
 * To run a query within a React component, call `useGetUserTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, options);
      }
export function useGetUserTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, options);
        }
export type GetUserTeamsQueryHookResult = ReturnType<typeof useGetUserTeamsQuery>;
export type GetUserTeamsLazyQueryHookResult = ReturnType<typeof useGetUserTeamsLazyQuery>;
export type GetUserTeamsQueryResult = Apollo.QueryResult<GetUserTeamsQuery, GetUserTeamsQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  getAllUsers {
    id
    username
    email
    avatar
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    id
    username
    email
    avatar
    teams {
      id
      name
      description
      channels {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: Float!) {
  getUser(userId: $userId) {
    id
    username
    email
    avatar
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const AddedChannelDocument = gql`
    subscription AddedChannel($teamId: Float!) {
  addedChannel(teamId: $teamId) {
    id
    name
    description
  }
}
    `;

/**
 * __useAddedChannelSubscription__
 *
 * To run a query within a React component, call `useAddedChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddedChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddedChannelSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddedChannelSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddedChannelSubscription, AddedChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddedChannelSubscription, AddedChannelSubscriptionVariables>(AddedChannelDocument, options);
      }
export type AddedChannelSubscriptionHookResult = ReturnType<typeof useAddedChannelSubscription>;
export type AddedChannelSubscriptionResult = Apollo.SubscriptionResult<AddedChannelSubscription>;
export const EditedDirectMessageDocument = gql`
    subscription EditedDirectMessage($userId: Float!, $teamId: Float!) {
  editedDirectMessage(userId: $userId, teamId: $teamId) {
    id
    text
    image
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __useEditedDirectMessageSubscription__
 *
 * To run a query within a React component, call `useEditedDirectMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedDirectMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedDirectMessageSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useEditedDirectMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<EditedDirectMessageSubscription, EditedDirectMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EditedDirectMessageSubscription, EditedDirectMessageSubscriptionVariables>(EditedDirectMessageDocument, options);
      }
export type EditedDirectMessageSubscriptionHookResult = ReturnType<typeof useEditedDirectMessageSubscription>;
export type EditedDirectMessageSubscriptionResult = Apollo.SubscriptionResult<EditedDirectMessageSubscription>;
export const NewDirectMessageDocument = gql`
    subscription NewDirectMessage($userId: Float!, $teamId: Float!) {
  newDirectMessage(userId: $userId, teamId: $teamId) {
    id
    text
    image
    createdAt
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __useNewDirectMessageSubscription__
 *
 * To run a query within a React component, call `useNewDirectMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDirectMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDirectMessageSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useNewDirectMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>(NewDirectMessageDocument, options);
      }
export type NewDirectMessageSubscriptionHookResult = ReturnType<typeof useNewDirectMessageSubscription>;
export type NewDirectMessageSubscriptionResult = Apollo.SubscriptionResult<NewDirectMessageSubscription>;
export const RemoveDirectMessageDocument = gql`
    subscription RemoveDirectMessage($teamId: Float!, $userId: Float!) {
  removeDirectMessage(teamId: $teamId, userId: $userId) {
    id
    text
    image
    createdAt
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __useRemoveDirectMessageSubscription__
 *
 * To run a query within a React component, call `useRemoveDirectMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRemoveDirectMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemoveDirectMessageSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveDirectMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<RemoveDirectMessageSubscription, RemoveDirectMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RemoveDirectMessageSubscription, RemoveDirectMessageSubscriptionVariables>(RemoveDirectMessageDocument, options);
      }
export type RemoveDirectMessageSubscriptionHookResult = ReturnType<typeof useRemoveDirectMessageSubscription>;
export type RemoveDirectMessageSubscriptionResult = Apollo.SubscriptionResult<RemoveDirectMessageSubscription>;
export const EditedMessageDocument = gql`
    subscription EditedMessage($channelId: Float!) {
  editedMessage(channelId: $channelId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useEditedMessageSubscription__
 *
 * To run a query within a React component, call `useEditedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useEditedMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<EditedMessageSubscription, EditedMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EditedMessageSubscription, EditedMessageSubscriptionVariables>(EditedMessageDocument, options);
      }
export type EditedMessageSubscriptionHookResult = ReturnType<typeof useEditedMessageSubscription>;
export type EditedMessageSubscriptionResult = Apollo.SubscriptionResult<EditedMessageSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($channelId: Float!) {
  newMessage(channelId: $channelId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const RemoveMessageDocument = gql`
    subscription RemoveMessage($channelId: Float!) {
  removeMessage(channelId: $channelId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useRemoveMessageSubscription__
 *
 * To run a query within a React component, call `useRemoveMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRemoveMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemoveMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useRemoveMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<RemoveMessageSubscription, RemoveMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RemoveMessageSubscription, RemoveMessageSubscriptionVariables>(RemoveMessageDocument, options);
      }
export type RemoveMessageSubscriptionHookResult = ReturnType<typeof useRemoveMessageSubscription>;
export type RemoveMessageSubscriptionResult = Apollo.SubscriptionResult<RemoveMessageSubscription>;
export const TeamNotificationDocument = gql`
    subscription TeamNotification($channelId: Float!) {
  teamNotification(channelId: $channelId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useTeamNotificationSubscription__
 *
 * To run a query within a React component, call `useTeamNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamNotificationSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useTeamNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<TeamNotificationSubscription, TeamNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamNotificationSubscription, TeamNotificationSubscriptionVariables>(TeamNotificationDocument, options);
      }
export type TeamNotificationSubscriptionHookResult = ReturnType<typeof useTeamNotificationSubscription>;
export type TeamNotificationSubscriptionResult = Apollo.SubscriptionResult<TeamNotificationSubscription>;
export const JoinedTeamDocument = gql`
    subscription JoinedTeam($teamId: Float!) {
  joinedTeam(teamId: $teamId) {
    id
    username
  }
}
    `;

/**
 * __useJoinedTeamSubscription__
 *
 * To run a query within a React component, call `useJoinedTeamSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJoinedTeamSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinedTeamSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useJoinedTeamSubscription(baseOptions: Apollo.SubscriptionHookOptions<JoinedTeamSubscription, JoinedTeamSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<JoinedTeamSubscription, JoinedTeamSubscriptionVariables>(JoinedTeamDocument, options);
      }
export type JoinedTeamSubscriptionHookResult = ReturnType<typeof useJoinedTeamSubscription>;
export type JoinedTeamSubscriptionResult = Apollo.SubscriptionResult<JoinedTeamSubscription>;
export const LeftTeamDocument = gql`
    subscription LeftTeam($teamId: Float!) {
  leftTeam(teamId: $teamId) {
    id
    username
  }
}
    `;

/**
 * __useLeftTeamSubscription__
 *
 * To run a query within a React component, call `useLeftTeamSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLeftTeamSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeftTeamSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLeftTeamSubscription(baseOptions: Apollo.SubscriptionHookOptions<LeftTeamSubscription, LeftTeamSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LeftTeamSubscription, LeftTeamSubscriptionVariables>(LeftTeamDocument, options);
      }
export type LeftTeamSubscriptionHookResult = ReturnType<typeof useLeftTeamSubscription>;
export type LeftTeamSubscriptionResult = Apollo.SubscriptionResult<LeftTeamSubscription>;