import styled from 'styled-components';

// MEMBERS 
export const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  align-items: center;
  padding: 5px;
  overflow: hidden;
  overflow-y: auto;
`;

export const MemberHeader = styled.h1`
  font-size: 1.75rem;
  margin-left: 10px;
  margin-top: 1rem;
  margin-right: auto;
`;

export const MemberList = styled.ul`
  width: 100%;
  list-style: none;
  margin-top: 5px;
  margin-left: 5px;
`;

export const MemberListItems = styled.li`
  padding: 4px;
  padding-left: 12px;
  cursor: pointer;
`;

export const MemberButton = styled.button`
  width: 90%;
  padding: 10px;
  background-color: var(--white);
  border: 1px solid var(--lightGray);
  cursor: pointer;
  border-radius: 5px;
  margin-top: 2rem;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: var(--darkPurple);
    color: var(--white);
  }
`;