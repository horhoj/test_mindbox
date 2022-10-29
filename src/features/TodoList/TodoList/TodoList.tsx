import { FC, useState, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { todoSlice } from '../todoSlice';
import { TodoItem } from '../TodoItem';
import { TodoEditForm } from '../TodoEditForm';
import { Todo } from '../types';
import styles from './TodoList.module.scss';

const PLACEHOLDER = 'Должно быть не пустым';

export const TodoList: FC = () => {
  const todoList = useAppSelector(todoSlice.selectors.getFilteredTodoList);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<string | null>(null);

  const handleToggleIsComplete = (id: string) => {
    dispatch(todoSlice.actions.toggleIsComplete(id));
  };
  const handleDelete = (id: string) => {
    dispatch(todoSlice.actions.deleteTodo(id));
  };

  const handleEdit = (id: string) => {
    setEditId(id);
  };

  const handlePatch = (values: Todo) => {
    dispatch(todoSlice.actions.patchTodo(values));
    setEditId(null);
  };

  return (
    <ul className={styles.wrap}>
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          {editId === todo.id ? (
            <TodoEditForm
              initialValues={todo}
              onSubmit={handlePatch}
              placeholder={PLACEHOLDER}
              onCancel={() => setEditId(null)}
              autoFocus={true}
              dataTestId={'edit-todo-input'}
            />
          ) : (
            <TodoItem
              todoItem={todo}
              onToggleIsComplete={() => handleToggleIsComplete(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => handleEdit(todo.id)}
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
};
