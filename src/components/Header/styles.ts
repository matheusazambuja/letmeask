import styled from "styled-components";


export const ContainerHeader = styled.header`
  /* Style theme */
  border-radius: ${props => props.theme === 'dark' ? '1px solid #2d2e31' : '1px solid #e2e2e2'};
  border-bottom: ${props => props.theme === 'dark' ? '2px solid #2d2e31' : '2px solid #e2e2e2'};

  padding: 1.1rem;

  transition: all 0.2s;
`;