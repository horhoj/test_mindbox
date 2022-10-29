import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '../../router';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.wrap}>
      <nav>
        <ul>
          <li>
            <NavLink to={getRoutePath('TodoList')}>Todo list</NavLink>
          </li>
          <li>
            <NavLink to={getRoutePath('About')}>About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
