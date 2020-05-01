import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  path?: 'dashboard' | 'import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  path,
}: HeaderProps) => (
  <Container size={size} path={path}>
    <header>
      <a href="https://github.com/gabrielmaximo">
        <img src={Logo} alt="GoFinances" />
      </a>
      <nav>
        <Link className="list" to="/">
          Listagem
          {path === 'dashboard' && <hr />}
        </Link>
        <Link className="import" to="/import">
          Import
          {path === 'import' && <hr />}
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
