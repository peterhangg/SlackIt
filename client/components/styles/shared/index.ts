import styled from 'styled-components';
import { ButtonProps, FormProps } from './types';

export const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SlackIconStyles = styled.img`
  margin-right: 0.5rem;
`;

export const HeaderHero = styled.h1`
  font-size: 4rem;
  color: #000000;
`;

export const PageHeader = styled.h1`
  margin-bottom: 2rem;
`;

export const HeaderHeroWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
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
  border: 1px solid grey;
  transition: ease-in box-shadow 0.5s;
  width: ${({ width }) => width ? width : '400px'};
  &:focus {
    outline: none;
    box-shadow: #611f69 0px 1px 4px, #611f69 0px 0px 0px 3px;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ButtonStyle = styled.button<ButtonProps>`
  background-color: #611f69;
  padding: 19px 40px 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 180px;
  border-radius: 5px;
  font-weight: 700;
  margin-right: ${({ mr }) => mr};
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: #4a154b;
  }
`;