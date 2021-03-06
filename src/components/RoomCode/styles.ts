import styled from "styled-components";


export const ContainerRoomCode = styled.button`
  height: 3.5rem;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  display: flex;

  .icon-copy-mobile {
    display: none;
  }

  :hover {
    filter: brightness(0.9);
  }

  &.light {
    background-color: #FFFFFF;
    border: 1px solid #e5534b;

    div {
      background-color: #e5534b;
    }

    span {
      color: #545458;
    }
  }

  &.dark {
    background-color: transparent;
    border: 1px solid #e5534b;

    div {
      background-color: #e5534b;
    }

    span {
      color: #F8F8F8;
    }
  }

  div {
    padding: 0 12px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 20px 0 16px;
    width: fit-content;
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    div {
      padding: 0 8px;

      > img {
        max-height: 1.3rem;
      }
    }

    span {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    
    &.light {
      border: 0;

      svg {
        stroke: #e5534b;
      }
    }

    &.dark {
      border: 0;

      svg {
        stroke: #e5534b;
      }
    }

    div {
      display: none;
    }

    span {
      display: none;
    }

    .icon-copy-mobile {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;