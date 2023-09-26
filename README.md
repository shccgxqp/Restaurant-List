# Restaurant List

![Restaurant home page](./public/image/restaurant_screen1.jpeg)
![Restaurant home page](./public/image/restaurant_screen2.jpeg)

A web app that you can find some restaurants and search them with keywords.

## Getting Started

> Ensure `Node.js v18` is installed on your machine

1. Clone the repo

   ```bash
   $ git clone https://github.com/shccgxqp/Restaurant-List.git
   ```

2. Go to the project directory

   ```bash
   $ cd Restaurant-List
   ```

3. Install the required npm packages

   ```bash
   $ npm install
   ```

4. create database in mysql

   ```bash
   CREATE DATABASE restaurant_list;
   ```

5. Install the sql migration & seed

   ```bash
   $ npm run migrate
   $ npm run seed
   ```

6. reference .env.example  create facebook app settings
   https://developers.facebook.com/?locale=zh_TW

   ```bash
   FACEBOOK_CLIENT_ID= enter CLIENT_ID
   FACEBOOK_CLIENT_SECRET= enter CLIENT_SECRET
   ```

7. Start the web app

   ```bash
   $ npm run start
   $ npm run dev
   ```


