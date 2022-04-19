#Marvel vs D.C comics (MvDc)

Welcome to the MvDc wiki!
This project is based off of [Quora](https://www.quora.com/)

MvDc, a [Quora](https://www.quora.com/) clone, is a social media, forum application that allows enthusiast of superheroes to openly share their opinions whether its movies, comics, or animation.

## [Feature List](https://github.com/vernfongchao/MvDc/wiki/MVP-Feature-List)

List of features needed for the Minimum Viable Product (MVP) and its CRUD features

## [Database Schema](https://github.com/vernfongchao/MvDc/wiki/Database-Schema)

Schema of how our PostgreSQL database will be set up

1. Clone this repo

   - `git clone https://github.com/vernfongchao/MvDc.git`

2. Install dependencies from the root directoy

   - `npm install`

3. Create a `PostgreSQL` user with `CREATEDB` and `Password` 

   - `CREATE USER <name> with CREATEDB PASSWORD <'password'>`

4. Create a `.env` in the backend directory based on the `.env.example` found within the backend directory

5. Enter your username and password information into your `.env` file along with your desired database name, a secured combination of characters for your `JWT_SECRET` and your desired `PORT` (recommended 5000 since proxy points to 5000)

6. Add the following proxy to your frontend `package.json` file replace to match the `PORT` configuration found in your `.env` file

   - `"proxy": "http://localhost:<NEW PORT NUMBER>"`

7. CREATE Database,Migrate, and Seed models in your backend terminal 

   Method 1
   
   - `npx dotenv sequelize db:create`
   - `npx dotenv sequelize db:migrate`
   - `npx dotenv sequelize db:seed:all`

   Method 2
   
   - `npm run db:setup`

8. Start the server in the backend terminal

   - `npm start`

9. Start the server in the frontend terminal

   - `npm start`

10. There is a Demo user or create an account to begin using MvDc
