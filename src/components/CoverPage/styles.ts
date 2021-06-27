import styled from 'styled-components';

export const ContainerCoverPage = styled.aside`
  /* Style theme */
  background-color: ${props => props.theme === 'dark' ? '#323741' : '#323741'};
  color: ${props => props.theme === 'dark' ? '#F8F8F8' : '#f8f8f8'};

  flex: 5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 120px 80px;

  transition: all 0.2s;

  img {
    max-width: 320px;
  }

  strong {
    font: 700 36px 'Poppins', sans-serif;
    line-height: 42px;
    margin-top: 16px;
  }

  p {
    font-size: 24px;
    line-height: 32px;
    margin-top: 12px;
  }

  @media (max-width: 1300px) {
      text-align: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;