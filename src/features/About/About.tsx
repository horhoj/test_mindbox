import { FC } from 'react';
import styles from './About.module.scss';

export const About: FC = () => {
  return (
    <div className={styles.wrap}>
      <div>
        <h2>О проекте</h2>
        <p>
          Данный проект предназначен для демонстрации навыков разработки на
          react и сопутствующих технологиях
        </p>
      </div>

      <div>
        <h3>Стек</h3>
        <p>
          typescript, react, redux-toolkit, formik, yup, uuid, docker, eslint,
          prettier + тесты с использованием @testing-library/react
        </p>
      </div>

      <div>
        <h3>Сведения о разработчике</h3>
        <p>
          Меня зовут Василий. Я разработчик js. Специализируюсь на стеке
          typescript, react, redux-toolkit и фронтент разработке, но не
          ограничен данными технологиями ))
        </p>
      </div>

      <div>
        <h3>github</h3>
        <a href="https://github.com/horhoj">https://github.com/horhoj</a>
      </div>

      <div>
        <h3>Telegram</h3>
        <a href="https://t.me/sarevok_horhoj">https://t.me/sarevok_horhoj</a>
      </div>
    </div>
  );
};
