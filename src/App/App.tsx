import React from 'react';
import { Router } from '../router';
import styles from './App.module.scss';
import { Header } from './Header';

export const App: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <Router />
      </main>
    </div>
  );
};
