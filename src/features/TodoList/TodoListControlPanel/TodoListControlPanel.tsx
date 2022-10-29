import { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { todoSlice } from '../todoSlice';
import { FilterType } from '../types';
import styles from './TodoListControlPanel.module.scss';

export const TodoListControlPanel: FC = () => {
  const filteredTodoList = useAppSelector(
    todoSlice.selectors.getFilteredTodoList,
  );
  const dispatch = useAppDispatch();
  const filterType = useAppSelector(todoSlice.selectors.getFilterType);

  const handleClearComplete = () => {
    dispatch(todoSlice.actions.clearCompleted());
  };

  const handleSetFilterType = (filterType: FilterType) => {
    dispatch(todoSlice.actions.setFilterType(filterType));
  };

  return (
    <div className={styles.wrap}>
      <div>{filteredTodoList.length} items found</div>
      <div className={styles.centralBtns}>
        <button
          onClick={() => handleSetFilterType('all')}
          className={classNames(filterType === 'all' && styles.control)}
        >
          All
        </button>
        <button
          onClick={() => handleSetFilterType('active')}
          className={classNames(filterType === 'active' && styles.control)}
        >
          Active
        </button>
        <button
          onClick={() => handleSetFilterType('completed')}
          className={classNames(filterType === 'completed' && styles.control)}
        >
          Complete
        </button>
      </div>
      <div>
        <button onClick={handleClearComplete}>Clear completed</button>
      </div>
    </div>
  );
};
