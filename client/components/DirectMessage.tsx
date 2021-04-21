import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ChatMessageContainer,
  MessageList,
  MessageListItems,
  UserIconWrapper,
  UserIcon,
  MessageWrapper,
  AuthorWrapper,
  MessageAuther,
  MessageMetaDate,
  MessageButton,
  MessageButtonWrapper,
} from './styles/Messages';
import { dateFormatter } from '../src/utils/dateFormatter';
import {
  EditedDirectMessageDocument,
  NewDirectMessageDocument,
  RemoveDirectMessageDocument,
  useDeleteDirectMessageMutation,
  useEditDirectMessageMutation,
  useGetDirectMessagesQuery,
  useGetMeQuery,
} from '../src/generated/graphql';
import useForm from '../src/utils/useForm';
import { FormStyles, InputStyles } from './styles/shared';

interface DirectMessageProps {
  teamId: number;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ teamId }) => {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [currentEditMessage, setCurrentEditMessage] = useState<number>(null);
  const directMessageContainerRef = useRef<HTMLDivElement>(null);
  const { inputs, handleChange } = useForm({
    text: '',
  });

  const { data: meData } = useGetMeQuery();
  const receiverId = parseInt(router.query.userId as string);
  const { data, subscribeToMore } = useGetDirectMessagesQuery({
    variables: {
      receiverId,
      teamId,
    },
    skip: !receiverId,
  });
  const [deleteDirectMessageMutation] = useDeleteDirectMessageMutation();
  const [editDirectMessageMutation] = useEditDirectMessageMutation();

  const directMessages = data?.getDirectMessages;
  const userId = meData?.getMe.id;

  const handleDelete = async (directMessageId: number) => {
    const response = await deleteDirectMessageMutation({
      variables: { directMessageId },
      update: (cache) => {
        cache.evict({ fieldName: 'getDirectMessages' });
      },
    }).catch((err) => console.error(err));

    if (!response) return;
    return response;
  };

  const toggleEditMessage = (messageId: number, message: string) => {
    if (!openEdit) {
      setCurrentEditMessage(messageId);
      setOpenEdit(true);
      inputs.text = message;
    } else {
      setCurrentEditMessage(null);
      setOpenEdit(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    directMessageId: number
  ) => {
    e.preventDefault();
    const response = await editDirectMessageMutation({
      variables: { text, directMessageId },
      update: (cache) => {
        cache.evict({ fieldName: 'getDirectMessages' });
      },
    }).catch((err) => console.error(err));
    if (!response) {
      return;
    }
    setCurrentEditMessage(null);
    setOpenEdit(false);
  };

  // Scroll to bottom on mount / new direct message
  useEffect(() => {
    if (directMessages?.length && directMessageContainerRef) {
      setTimeout(() => {
        directMessageContainerRef.current.scrollTop =
          directMessageContainerRef.current.scrollHeight;
      }, 50);
    }
  }, [directMessages]);

  useEffect(() => {
    const subscriptionNewDirectMessage = subscribeToMore({
      document: NewDirectMessageDocument,
      variables: {
        userId,
        teamId,
      },
      updateQuery: (prev, res: any) => {
        if (!res.subscriptionData.data) {
          return prev;
        }
        const newDirectMessage = res.subscriptionData.data.newDirectMessage;
        return {
          ...prev,
          getDirectMessages: [...prev.getDirectMessages, newDirectMessage],
        };
      },
    });

    const subscriptionRemoveDirectMessage = subscribeToMore({
      document: RemoveDirectMessageDocument,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, res: any) => {
        if (!res.subscriptionData.data) {
          return prev;
        }
        const removeDirectMessage =
          res.subscriptionData.data.removeDirectMessage;
        return {
          ...prev,
          getDirectMessages: prev.getDirectMessages.filter(
            (directMessage) => directMessage.id !== removeDirectMessage.id
          ),
        };
      },
    });

    const subscriptionEditedDirectMessage = subscribeToMore({
      document: EditedDirectMessageDocument,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, res: any) => {
        if (!res.subscriptionData.data) {
          return prev;
        }
        return {
          ...prev,
          getDirectMessages: [...prev.getDirectMessages],
        };
      },
    });

    return () => {
      subscriptionNewDirectMessage();
      subscriptionRemoveDirectMessage();
      subscriptionEditedDirectMessage();
    };
  }, [subscribeToMore, teamId]);

  return (
    <ChatMessageContainer ref={directMessageContainerRef}>
      <MessageList>
        {directMessages?.map((directMessage) => (
          <MessageListItems key={`directMessage-${directMessage.id}`}>
            <UserIconWrapper>
              <UserIcon>
                {directMessage.creator.username.charAt(0).toUpperCase()}
              </UserIcon>
            </UserIconWrapper>
            <MessageWrapper>
              <AuthorWrapper>
                <MessageAuther>
                  {directMessage.creator.username}
                  <MessageMetaDate>
                    {directMessage.updatedAt <= directMessage.createdAt
                      ? dateFormatter(directMessage.createdAt)
                      : dateFormatter(directMessage.updatedAt) + ' (edited)'}
                  </MessageMetaDate>
                </MessageAuther>
                {userId === directMessage.creator.id && (
                  <MessageButtonWrapper>
                    {directMessage.text && (
                      <MessageButton
                        onClick={() =>
                          toggleEditMessage(
                            directMessage.id,
                            directMessage.text
                          )
                        }
                      >
                        <i className="fas fa-edit" />
                      </MessageButton>
                    )}
                    <MessageButton
                      onClick={() => handleDelete(directMessage.id)}
                    >
                      <i className="fas fa-trash" />
                    </MessageButton>
                  </MessageButtonWrapper>
                )}
              </AuthorWrapper>
              {openEdit && currentEditMessage === directMessage.id ? (
                <>
                  <FormStyles
                    width="95%"
                    onSubmit={(e) =>
                      handleSubmit(e, inputs.text, directMessage.id)
                    }
                  >
                    <InputStyles
                      type="text"
                      name="text"
                      value={inputs.text}
                      onChange={handleChange}
                    />
                  </FormStyles>
                  {directMessage.image && (
                    <img src={directMessage.image} alt={directMessage.text} />
                  )}
                </>
              ) : (
                <>
                  <p>{directMessage.text}</p>
                  {directMessage.image && (
                    <img src={directMessage.image} alt={directMessage.text} />
                  )}
                </>
              )}
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default DirectMessage;
