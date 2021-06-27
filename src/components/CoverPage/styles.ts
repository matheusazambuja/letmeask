import styled from 'styled-components';

export const ContainerCoverPage = styled.aside`
  /* Style theme */
  background-color: ${props => props.theme === 'dark' ? '#323741' : '#323741'};
  color: ${props => props.theme === 'dark' ? '#F8F8F8' : '#f8f8f8'};

  flex: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 7.5rem 5rem;

  transition: all 0.2s;

  img {
    max-width: 20rem;
  }

  strong {
    font: 700 2.2rem 'Poppins', sans-serif;
    line-height: 2.6rem;
    text-align: center;
    margin-top: 1rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 32px;
    text-align: center;
    margin-top: 0.8rem;
  }

  /* @media (max-width: 1300px) {
    strong p {
      
    }
  } */

  @media (max-width: 768px) {
    display: none;
  }
`;