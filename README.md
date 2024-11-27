# 🐾 Superhero Database App

This project is a web application that allows us to do CRUD operations of the superhero model.

## 🛠️ Technologies Used:

### Frontend
- **React** — for building the user interface
- **React Router** — for client-side routing
- **Axios** — for making HTTP requests to the backend
- **CSS Modules** — for styling components
- **Antd** — for special components

### Backend
- **Node.js** — JavaScript runtime for server-side development
- **Express** — web framework for Node.js, handling API routes
- **Sequelize** — ORM library that helps work easier with database
- **Multer** — library for uploading and saving files
- **Mysql** — SQL database for data persistence


## 🚀 How to Run the Project

Firstly, you should download zip of this project and unzip it or use git clone.

1. **Install the backend dependencies:**
   
    ```bash
   cd backend
   npm install
   ```

2. **Edit database.js file for connection to db:**
   
   example:
   ```bash
   const sequelize = new Sequelize('your_database_name', 'your_user_name', 'your_password', {
    host: 'localhost',
    dialect: 'mysql'
    });
   ```

3. **Run local mysql db:**
   sql code for my db u can find in folder -- resources -- test-task.sql file

4. **Start the backend server:**

   ```bash
   node index.js
   ```

5. **Install the frontend dependencies:**
   
    ```bash
   cd frontend
   npm install
   ```

6. **Start the frontend server:**

   ```bash
   npm start
   ```

## 🖼️ Screenshots:

### Home Page(Pagination you can check only if you have more than 10 heroes)
![image](https://github.com/user-attachments/assets/d449ce2f-f487-4802-9fe1-ef3ff7d50a05)

### Create Hero Page
![image](https://github.com/user-attachments/assets/40c03173-9dff-477a-99c1-3a82c9fa4c82)

### Edit Hero Page
![image](https://github.com/user-attachments/assets/fa4e4990-ab32-4b7f-8455-69aba77196b1)

### Hero Detail Page
![image](https://github.com/user-attachments/assets/e1818e3c-eb56-4546-878c-86c307238b9c)


## To check functionality download this project and follow my instructions.
