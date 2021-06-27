import styled from "styled-components";


export const ContainerButton = styled.button`
  /* Style theme */
  background-color: ${props => props.theme === 'dark' ? '#23242a' : '#e6e6e6'};
  border: ${props => props.theme === 'dark' ? '1px solid #e5534b' : '1px solid #a8a8b3'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#29292e'};

  height: 5rem;
  border-radius: 16px;
  font-weight: 500;
  background: #e5534b;
  color: #FFFFFF;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: all 0.2s;

  img {
    margin-right: 0.5rem;
  }

  &.outlined {
    background-color: transparent;
    border: 1px solid #e5534b;
    color: #e5534b;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;