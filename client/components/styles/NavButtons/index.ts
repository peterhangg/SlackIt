import styled from 'styled-components';
import { ButtonProps } from '../shared/types';

export const NavButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 10px;
`;

export const NavButtonStyles = styled.button<ButtonProps>`
  background-color: var(--purple);
  padding: 15px 20px;
  color: var(--white);
  margin-right: ${({ mr }) => mr};
  border: 1px solid var(--white);
  cursor: pointer;
  width: 180px;
  border-radius: 5px;
  font-weight: 700;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: var(--white);
    color: var(--purple);
    outline: none;
  }
`;
