import styled from 'styled-components';
import { ButtonProps, FormProps, LogoHeaderProps } from './types';

export const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

export const PageHeader = styled.h1`
  margin-bottom: 2rem;
`;

export const FormStyles = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ width }) => width ? width : '400px'};
`;

export const InputStyles = styled.input`
  width: 100%;
  padding: 10px;
  display: block;
  font-size: 1.25rem;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid var(--darkGray);
  transition: ease-in box-shadow 0.5s;
  width: ${({ width }) => width ? width : '400px'};
  &:focus {
    outline: none;
    box-shadow: var(--purple) 0px 1px 4px, var(--purple) 0px 0px 0px 3px;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: var(--red);
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ButtonStyle = styled.button<ButtonProps>`
  background-color: var(--purple);
  padding: 19px 40px 20px;
  color: var(--white);
  border: none;
  cursor: pointer;
  width: 180px;
  border-radius: 5px;
  font-weight: 700;
  margin-right: ${({ mr }) => mr};
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: var(--darkPurple);
  }
`;

export const FormMessage = styled.p`
  color: var(--darkGray);
  margin-top: 12px;
`;

export const FormMessageLink = styled.span`
  font-weight: 700;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

// LOGO 
export const SlackIconStyles = styled.img`
  margin-right: 0.5rem;
`;

export const LogoHeader = styled.h1<LogoHeaderProps>`
  font-size: 4rem;
  color: ${({ color }) => color ? color : `var(--black)` };
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
