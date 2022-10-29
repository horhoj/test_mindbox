import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Todo } from '../types';
import styles from './TodoEditForm.module.scss';

interface TodoEditFormProps {
  initialValues: Todo;
  onSubmit: (values: Todo) => void;
  onCancel?: () => void;
  placeholder: string;
  autoFocus: boolean;
  dataTestId: string;
}

const validationSchema = yup.object({
  text: yup.string().required(),
});

export const TodoEditForm: FC<TodoEditFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  placeholder,
  autoFocus,
  dataTestId,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.wrap}
    >
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        {...formik.getFieldProps('text')}
        autoFocus={autoFocus}
        onBlur={() => onCancel && onCancel()}
        data-testid={dataTestId}
      />
    </form>
  );
};
