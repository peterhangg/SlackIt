import styled, { keyframes } from 'styled-components';

export const FadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1
}
`;

// ADD CHANNEL MODAL
export const ModalWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: var(--white);
width: 50%;
height: 50%;
max-width: 550px;
max-height: 450px;
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
top: 20px;
right: 20px;
height: 24px;
width: 24px;
padding: 0;
cursor: pointer;
&:hover {
  color: var(--darkPurple);
}
`;