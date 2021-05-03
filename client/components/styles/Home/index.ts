import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--purple);
`;

export const HomeContentWrapper = styled.div`
  width: 33%;
  max-width: 600px;
`;

export const HomeContent = styled.p`
  color: var(--white);
  font-size: 1.25rem;
  margin-top: 0.75rem;
`;