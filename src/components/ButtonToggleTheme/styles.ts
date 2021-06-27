import styled from "styled-components";

export const ContainerButtonToggleTheme = styled.button`
  /* Style theme */
  background-color: ${props => props.theme === 'dark' ? '#23242a' : '#f8f8f8'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#29292e'};

  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 3.5em;
  border-radius: 9999px;
  font-weight: 500;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 2px solid #e5534b;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;