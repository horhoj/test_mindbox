import { FC } from 'react';
import { TodoList } from '../TodoList';
import { TodoAdd } from '../TodoAdd';
import { TodoListControlPanel } from '../TodoListControlPanel';
import styles from './TodoListMainForm.module.scss';

export const TodoListMainForm: FC = () => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>TODOS</h2>
      <TodoListControlPanel />
      <TodoAdd />
      <TodoList />
    </div>
  );
};
