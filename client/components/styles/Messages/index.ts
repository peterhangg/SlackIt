import styled from "styled-components";

export const ChatMessageContainer = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
`;

export const MessageList = styled.ul`
  list-style: none;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
  position: relative;
  padding: 5px 10px;
`;

export const UserIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  margin: 0 10px;
`;

export const UserIcon = styled.div`
  font-size: 1.5rem;
`;

export const MessageListItems = styled.li`
  display: flex;
  padding: 10px 0;
`;

export const AuthorWrapper = styled.div`
  display: flex;
`;

export const MessageAuther = styled.h3`
  padding-bottom: 4px;
`;

export const MessageMetaDate = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #404040;
`;

export const MessageButton = styled.button`
  margin-left: 10px;
  background-color: var(--white);
  border: none;
  outline: none;
  &:hover {
    i {
      color: var(--darkPurple);
    }
  }
`;

export const MessageWrapper = styled.div`
  width: 100%;
`;

export const MessageButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 12px;
`;

export const FetchMessageLoader = styled.p`
  text-align: center;
  width: 100%;
  position: absolute;
  top: 0;
  padding: 10px;
`

export const MessageAvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 10px;
`;

export const MessageAvatarStyles = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MessageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessageHeaderWrapper = styled.div`
  border-bottom: solid 1px var(--lightGray);
  padding: 1rem;
`;

export const MessageHeader = styled.h1`
  font-size: 2rem;
`;
