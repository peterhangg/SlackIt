import styled, { keyframes } from "styled-components";

export const FadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1
}
`;

export const ModalWrapper = styled.div`
padding: 25px 0;
display: flex;
flex-direction: column;
align-items: center;
background-color: #fff;
width: 40%;
height: 55%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
border-radius: 3px;
animation: 1s ${FadeIn} ease-in;
z-index: 1000;
`;

export const ClosedModalButton = styled.button`
background: none;
border: none;
outline: none;
position: absolute;
font-size: 1.5rem;
top: 20px;
right: 20px;
height: 24px;
width: 24px;
padding: 0;
cursor: pointer;
&:hover {
  color: #4a154b;
}
`;

export const TeamListContainer = styled.ul`
display: flex;
flex-direction: column;
align-items: center;
list-style: none;
overflow-y: auto;
width: 100%;
height: 100%;
`;

export const TeamListItems = styled.li`
display: flex;
align-items: center;
width: 100%;
text-align: center;
margin-bottom: 2px;
padding: 15px 10px;
transition: ease-out background-color 0.5s;
&:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
`;