import { getRandomId } from '../../utils/getRandomId';
import { Todo } from './types';

export const defaultData: Todo[] = [
  { id: getRandomId(), isComplete: true, text: 'Тестовое задание' },
  { id: getRandomId(), isComplete: false, text: 'Прекрасный код' },
  { id: getRandomId(), isComplete: false, text: 'Покрытие тестами' },
];
