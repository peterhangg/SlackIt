import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  height: 100%;
`

export const Messages: React.FC = () => {
    return (
      <MessageContainer>
        <h2>Messages</h2>
      </MessageContainer>
    );
}

export default Messages;