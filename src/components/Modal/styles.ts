import styled from "styled-components";

export const ContainerModal = styled.div`
  .overlay-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    transition: all 0.2s;

    &.dark {
      background-color: #050206cb;
    }
    
    &.light {
      background-color: #63636331;
    }

    .modal {
      // margin: 14rem 26.5rem 14.6rem 26.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    
      transition: all 0.2s;
    }
  }
`;