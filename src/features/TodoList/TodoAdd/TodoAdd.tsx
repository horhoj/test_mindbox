import { FC, useState } from 'react';
import { TodoEditForm } from '../TodoEditForm';
import { Todo } from '../types';
import { useAppDispatch } from '../../../store/hooks';
import { todoSlice } from '../todoSlice';
import { getRandomId } from '../../../utils/getRandomId';
import styles from './TodoAdd.module.scss';

const PLACEHOLDER = 'Что вы хотите добавить';

const INITIAL_STATE: Todo = {
  text: '',
  id: getRandomId(),
  isComplete: false,
};

export const TodoAdd: FC = () => {
  const [initialState, setInitialState] = useState<Todo>(INITIAL_STATE);

  const dispatch = useAppDispatch();

  const handleSubmit = (values: Todo) => {
    dispatch(todoSlice.actions.addTodo(values));
    setInitialState({ ...INITIAL_STATE, id: getRandomId() });
  };

  return (
    <div className={styles.wrap}>
      <TodoEditForm
        initialValues={initialState}
        onSubmit={handleSubmit}
        placeholder={PLACEHOLDER}
        autoFocus={false}
        dataTestId={'add-new-todo-input'}
      />
    </div>
  );
};
