# Книга контактов (REACT + NODE.JS + BOOTSTRAP)

  CRUD приложение реализует следующие возможности: авторизация и регистрация пользователя, отображение списка контактов в разрезе авторизованного пользователя, карточка контакта, создание нового контакта, редактирование контакта, удаление контакта, поиск по контактам.

![Login](/assets/img01.jpg "Логин")
![ContactsList](/assets/img02.jpg "Список контактов")
![ContactCard](/assets/img03.jpg "Карточка контактов")
![ContactEditCard](/assets/img04.jpg "Карточка редактирования")

[REACT](https://reactjs.org/) + [React Bootstrap](https://react-bootstrap.github.io/)

## Сервер

Реализован на [typicode/json-server](https://github.com/typicode/json-server).
Структура базы данных представляет собой три таблицы: users, contacts, info.

Пример:

{
  "users": [
    {
      "id": 1,
      "name": "Mern",
      "email": "1@mail.ru",
      "password": "12345"
    }
  ]

  "contacts": [
    {
      "id": 1,
      "userId": 1,
      "title": "Nik",
      "description": "The best friend"
    }
  ]

  "info": [
    {
      "id": 1,
      "userId": 1,
      "contactId": 1,
      "description": "phone",
      "value": "123-45-67"
    }
  ]
}

Для запуска в директории проекта:

### `cd server`

### `npm run server`

Открыть [http://localhost:5000](http://localhost:5000) для просмотра в браузере.

## Клиент

Для запуска в директории проекта:

### `cd client`

### `npm start`
Приложение стартует [http://localhost:3000](http://localhost:3000) в браузере.
