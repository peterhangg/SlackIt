import styled from "styled-components";
import { TeamListItemProps } from "./types";

export const TeamContainer = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-right: 1px solid #d3d3d3;
`;
export const TeamList = styled.ul`
  list-style: none;
  width: 100%;
`;

export const TeamListItem = styled.li<TeamListItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  border: ${({ teamId }) =>
    teamId ? '3px solid #D3D3D3' : '1px solid #D3D3D3'};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: #fff;
    color: #763857;
    cursor: pointer;
  }
`;