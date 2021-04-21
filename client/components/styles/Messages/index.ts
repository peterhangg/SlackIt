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
  flex-direction: column;
  position: relative;
`;

export const MessageWrapper = styled.div`
  padding: 10px 0;
  width: 100%;
`;

export const UserIcon = styled.div`
  font-size: 1.5rem;
  border: 1px solid#D3D3D3;
  border-radius: 10px;
  padding: 7px 10px;
`;

export const MessageListItems = styled.li`
  display: flex;
  padding-bottom: 10px;
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

export const UserIconWrapper = styled.div`
  height: 100%;
  padding: 10px;
`;

export const MessageButton = styled.button`
  margin-left: 10px;
  background-color: #fff;
  border: none;
  outline: none;
  &:hover {
    i {
      color: #4a154b;
    }
  }
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