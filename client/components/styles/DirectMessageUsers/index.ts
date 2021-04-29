import styled from "styled-components";
import { DirectMessageListItemProps } from "./types";

export const DirectMessageContainer = styled.div`
margin-top: 2rem;
max-height: 33%;
overflow-y: auto;
`;

export const DirectMessageList = styled.ul`
width: 100%;
list-style: none;
`;

export const DirectMessageListItem = styled.li<DirectMessageListItemProps>`
padding: 2px;
padding-left: 12px;
color: var(--offWhite);
font-weight: ${({ userId }) => (userId ? 'bold' : 'normal')};
&:hover {
  cursor: pointer;
}
`;

export const DirectMessageHeader = styled.h3`
padding-left: 12px;
padding-bottom: 5px;
font-weight: bold;
color: var(--white);
`;
