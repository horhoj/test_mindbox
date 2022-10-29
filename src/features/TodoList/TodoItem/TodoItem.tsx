import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import checkIcon from '../../../assets/img/check-mark-complete.svg';
import editIcon from '../../../assets/img/edit.svg';
import deleteIcon from '../../../assets/img/delete.svg';
import styles from './TodoItem.module.scss';

interface TodoItemProps {
  todoItem: Todo;
  onToggleIsComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todoItem,
  onToggleIsComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <li className={styles.wrap} data-testid={`todo-item`}>
      <button
        className={styles.button}
        onClick={onToggleIsComplete}
        data-testid={`todo-toggle-complete-btn`}
      >
        {todoItem.isComplete && (
          <img
            src={checkIcon}
            alt="checkIcon"
            data-testid={`todo-toggle-complete-btn-img`}
          />
        )}
      </button>
      <span
        className={classNames(
          styles.text,
          todoItem.isComplete && styles.textDisabled,
        )}
        data-testid={'todo-item-text'}
      >
        {todoItem.text}
      </span>
      <div className={styles.buttonsWrap}>
        <button
          className={styles.button}
          onClick={onEdit}
          data-testid="todo-edit-btn"
        >
          <img src={editIcon} alt="checkIcon" />
        </button>
        <button
          className={styles.button}
          onClick={onDelete}
          data-testid="todo-delete-btn"
        >
          <img src={deleteIcon} alt="checkIcon" />
        </button>
      </div>
    </li>
  );
};
