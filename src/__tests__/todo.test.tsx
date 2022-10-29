import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { TodoListMainForm } from '../features/TodoList/TodoListMainForm';
import { defaultData } from '../features/TodoList/defaultData';
import { Todo } from '../features/TodoList/types';

//функция определяет правильность вывода массива
//todo, на основе переданного массива, включая порядок списка дел
describe('проверяем работоспособность списка дел', () => {
  const checkTodoList = (todoListData: Todo[], ren: RenderResult) => {
    //получаем все элементы списка дел
    const todoList = ren.getAllByTestId('todo-item');

    //для каждого элемента списка дел выполняем ряд проверок
    todoList.forEach((todo, index) => {
      const todoData = todoListData[index];
      //возможна ситуация когда в списке будет присутствовать "посторонний" элемент и мы
      //столкнемся с ситуацией когда в массиве todoListData не будет для него соответствующего элемента
      expect(todoData).not.toBeUndefined();

      //Здесь мы проверяем содержит ли найденный блок нужный текст (текст из todo)
      if (todoData) {
        expect(todo).toHaveTextContent(String(todoData.text));

        //На основе состояния isComplete выводиться картинка с галочкой (завершено ли задание)
        if (todoData.isComplete) {
          //здесь мы проверяем выводиться ли эта картинка когда todo завершено
          expect(
            todo.querySelector(
              'img[data-testid="todo-toggle-complete-btn-img"]',
            ),
          ).toBeTruthy();
        } else {
          //здесь мы проверяем отсутствие картинки если задача еще не завершена
          expect(
            todo.querySelector(
              'img[data-testid="todo-toggle-complete-btn-img"]',
            ),
          ).toBeFalsy();
        }
      }
    });
  };

  //Данный тест выполняется как единое целое и полностью эмулирует работу пользователя.
  //Он состоит из нескольких шагов
  //На каждом шаге совершаются какие-то действия и проверяется вывод результата в компоненте, на основе вывода полного списка дел.
  //Таким образом можно избежать ситуации, когда например при удалении мы проверяем например удалился ли элемент, но не отслеживаем
  // повлиял ли клик по кнопке удаления на другие элементы списка
  it('Интеграционный тест на проверку вывода по умолчанию, добавление, изменение и удаления дел', async () => {
    const app = (
      <Provider store={store}>
        <TodoListMainForm />
      </Provider>
    );

    const ren = render(app);

    const NEW_TODO_TEXT = 'Новый туду __ f342f379-18c7-42d7-9b01-2c2d4e39a621';

    let currentTodoData: Todo[];

    //шаг 1: проверяем вывод первоначального списка дел
    {
      currentTodoData = [...defaultData];

      checkTodoList(currentTodoData, ren);
    }

    //шаг 2: добавляем новый todo через форму ввода и проверяем вывод списка дел

    {
      const todoInput = ren.getByTestId('add-new-todo-input');
      fireEvent.change(todoInput, { target: { value: NEW_TODO_TEXT } });
      fireEvent.submit(todoInput);

      await waitFor(() => ren.getByText(NEW_TODO_TEXT));

      currentTodoData = [
        { id: '', text: NEW_TODO_TEXT, isComplete: false },
        ...currentTodoData,
      ];
      checkTodoList(currentTodoData, ren);
    }

    //шаг 3: кликаем по всем кнопкам isComplete и проверяем вывод списка дел
    {
      const isCompleteBtnList = ren.getAllByTestId('todo-toggle-complete-btn');

      isCompleteBtnList.forEach((btn) => {
        fireEvent.click(btn);
      });

      currentTodoData = currentTodoData.map((todoData) => ({
        ...todoData,
        isComplete: !todoData.isComplete,
      }));
      checkTodoList(currentTodoData, ren);
    }

    //шаг 4: в каждом todo меняем текст на новый, сохраняем и проверяем вывод списка дел
    {
      const editBtnList = ren.getAllByTestId('todo-edit-btn');

      const getNewText = (index: number) => `новый текст ${index}`;

      const editAction = async (btn: HTMLElement, index: number) => {
        fireEvent.click(btn);
        const editInput = ren.getByTestId('edit-todo-input');
        fireEvent.change(editInput, {
          target: { value: getNewText(index) },
        });
        fireEvent.submit(editInput);
        await waitFor(() => ren.getByText(getNewText(index)));
      };

      for (let i = 0; i < editBtnList.length; i++) {
        const btn = editBtnList[i];
        expect(btn).toBeTruthy();
        if (btn) {
          await editAction(btn, i);
        }
      }

      currentTodoData = currentTodoData.map((todo, index) => ({
        ...todo,
        text: getNewText(index),
      }));

      checkTodoList(currentTodoData, ren);
    }

    // на текущий момент в списке должно быть 4 элемента, удаляем из них 2 и 3 и проверяем вывод списка дел
    {
      const deleteBtnList = ren.getAllByTestId('todo-delete-btn');
      const deleteTodoIndex = [1, 2];

      deleteBtnList.forEach((btn, index) => {
        if (deleteTodoIndex.includes(index)) {
          fireEvent.click(btn);
        }
      });

      currentTodoData = [
        ...currentTodoData.filter(
          (todo, index) => !deleteTodoIndex.includes(index),
        ),
      ];
      checkTodoList(currentTodoData, ren);
    }
  });
});
