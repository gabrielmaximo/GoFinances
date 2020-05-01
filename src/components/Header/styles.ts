import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  path?: 'dashboard' | 'import';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;

      a {
        font-size: 16px;
        transition: opacity transform 0.2s;
        transition: transform 0.2s;
        text-decoration: none;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          color: #fff;
          transform: translate(4px, -4px);
          opacity: 1;
        }

        hr {
          margin-top: 10px;
          background-color: #ff872c;
          padding: 0.5px;
        }
      }

      .list {
        color: ${({ path }) => (path === 'import' ? '#FFF ' : '#FF872C')};
        font-weight: ${({ path }) => (path === 'import' ? 'normal' : 'bold')};
        opacity: ${({ path }) => (path === 'import' ? '0.8' : '1')};
      }

      .import {
        color: ${({ path }) => (path !== 'import' ? '#FFF ' : '#FF872C')};
        font-weight: ${({ path }) => (path !== 'import' ? 'normal' : 'bold')};
        opacity: ${({ path }) => (path !== 'import' ? '0.8' : '1')};
      }
    }
  }
`;
