import styled from "styled-components";

export const ContainerQuestion = styled.div`
  #question {
    border-radius: 12px;
    padding: 32px 36px;
    margin-top: 24px;
    
    &.light {
      background-color: #fefefe;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

      p {
        color: #29292e;
      }

      .user-info span {
        color: #737380;
      }

      &.highlighted {
        background-color: #fff0f0;
        border: 1px solid #e5534b;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
    
        footer .user-info span {
          color: #29292E;
        }
    
        .icon-select path {
          stroke: #ad322b;
        }
      }
    
      &.answered {
        background-color: #DBDCDD;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
      }
    }

    &.dark {
      background-color: #323741;
      color: #F8F8F8;
      box-shadow: 0 2px 12px rgba(80, 80, 80, 0.1);
      border: 0;

      &.highlighted {
        background-color: rgba(229, 83, 75, 0.3);
        border: 1px solid #aa3c41;
        box-shadow: 0 2px 12px rgba(206, 206, 206, 0.04);

        .user-info {
          span {
            color: #F8F8F8;
          }
        }
      }

      &.answered {
        background-color: transparent;
        box-shadow: 0px 1px 6px rgba(252, 252, 252, 0.04);
        filter: brightness(0.9);

        footer .question-children button .icon-answered {
          svg {
            path {
              stroke: #e5534b;
            }
      
            circle {
              stroke: #e5534b;
            }
          }
        }
      }

      svg path, circle, path {
        stroke: #F8F8F8;
      }

      .user-info {
        span {
          filter: brightness(0.9);
        }
      }
    }

    svg {
      transition: all 0.2s;
    }

    &.highlighted {
      padding: 36px 40px;

      transition: all 0.2s;
    }

    .icon-delete {
      transition: all 0.2s;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;

      transition: all 0.2s;
    }

    .user-info {
      display: flex;
      align-items: center;

      transition: all 0.2s;

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;

        transition: all 0.2s;
      }

      span {
        margin-left: 14px;
        font-size: 0.8rem;
        letter-spacing: 0.2px;
      }
    }

    button {
      border: 0;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.2s;

      &.hover {
        filter: brightness(0.7);
      }
    }
  }
`;