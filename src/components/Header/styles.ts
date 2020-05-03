import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  path?: 'list' | 'import';
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
        transition: opacity 0.2s;
        transition: transform 0.2s;
        text-decoration: none;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          font-weight: bold;
          transform: translate(4px, -4px);
          opacity: 1;
        }

        hr {
          margin-top: 10px;
          padding: 0.5px;
        }
      }

      .import {
        color: ${({ path }) => (path === 'import' ? '#FF872C' : '#FFF ')};
        font-weight: ${({ path }) => (path === 'import' ? 'bold' : 'normal')};
        opacity: ${({ path }) => (path === 'import' ? '1' : '0.8')};
      }

      .list {
        color: ${({ path }) => (path === 'list' ? '#FF872C' : '#FFF')};
        font-weight: ${({ path }) => (path === 'list' ? 'bold' : 'normal')};
        opacity: ${({ path }) => (path === 'list' ? '1' : '0.8')};
      }
    }
  }
`;
