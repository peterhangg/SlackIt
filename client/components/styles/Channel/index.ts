import styled from 'styled-components';
import { ChannelListItemProps } from './types';

// CHANNEL DESCRIPTION
export const ChannelDescriptionContainer = styled.div`
  padding: 0 5px 5px 5px;
`;

export const ChannelDescriptionHeader = styled.h1`
  font-size: 1.75rem;
  margin-left: 10px;
  margin-top: 1rem;
`;

export const ChannelDescriptionStyles = styled.p`
  padding: 4px;
  padding-left: 12px;
`;

// CHANNELS
export const ChannelContainer = styled.div`
  max-height: 33%;
  color: #e5e5e5;
  overflow-y: auto;
`;

export const AddChannelIcon = styled.button`
  font-size: 1rem;
  padding: 2px 5px;
  color: #e5e5e5;
  background-color: #763857;
  border: none;
  margin-right: 1rem;
  border-radius: 3px;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

export const ChannalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChannelList = styled.ul`
  width: 100%;
  list-style: none;
`;

export const ChannelListItem = styled.li<ChannelListItemProps>`
  padding: 2px;
  padding-left: 12px;
  color: #e5e5e5;
  font-weight: ${({ channelId }) => (channelId ? 'bold' : 'normal')};
  &:hover {
    cursor: pointer;
  }
`;

export const ChannelListHeader = styled.h3`
  padding-left: 12px;
  font-weight: bold;
  color: #fff;
`;
