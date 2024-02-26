This is an application designed to track customer purchase history, utilizing MySQL as the database backend. The objective is to demonstrate how to construct SQL queries and link tables together using foreign key constraints and joins. Additionally, I created custom functions to interact with the database, using the Promise API. Furthermore, the aim is to develop a straightforward application showcasing basic CRUD (Create, Read, Update, Delete) operations, illustrating interaction with a relational database management system (RDBMS). It's important to note that this application serves as a simulation and does not have real-life utility, as customers do not have access to the products within. Product data must be manually inserted into the transactions table within the database. The database consists of three tables: users, customers, and transactions. The transactions table includes the product details. If you wish to clone this repository, you will need to create and connect these tables accordingly. Lastly, the architecture employs a Single Page Application (SPA) model with React.js handling the frontend and Express.js managing the backend.


note: the customers table has a foreign key(user_id) references users(user_id). the transactions table has a foreign key(customer_id) references customers(customer_id).

![Screen Shot 2024-02-26 at 6 56 05 AM](https://github.com/JonathanRaposo/customer-purchase-tracker/assets/67019470/a2464719-0671-4f8f-96f5-6230c992179a)


 
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
