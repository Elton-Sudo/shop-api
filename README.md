# Shop API

## Project Description

The **Shop API** is a Node.js-based e-commerce API designed to handle operations for products, users, and orders in an online shop. The API follows modern development principles such as DRY, SOLID, and KISS to ensure clean, maintainable, and scalable code. The project uses **Express**, **Prisma**, and **MySQL** for backend development, with **TypeScript** for type safety and **Docker** for containerization.

This API supports secure user registration, login, CRUD operations for products and orders, as well as role-based access control using JWT. The project is also documented using **Swagger** and follows security best practices like password hashing and environment variable management.

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or later)
- **Docker** (for MySQL container)
- **MySQL** (for local database setup)
- **Yarn** or **npm** (for package management)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/shop-api.git
   cd shop-api
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up environment variables**: Create a .env file in the root directory with the following content
   ```bash
   DATABASE_URL="mysql://root:root@localhost:3306/shop"
   JWT_SECRET="your-secret-key"
4. **Set up the MySQL database**: Use Docker to spin up a MySQL container
   ```bash
   docker run --name shop-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shop -p 3306:3306 -d mysql:8
5. **Generate Prisma client**:
   ```bash
   npm run prisma
6. **Docker**:
   ```bash
   docker compose -f 'docker-compose.yml' up -d --build 'app'

7. **Run the application**:

   - Development
   ```bash
   npm run dev
   ```
   - Production
   ```bash
   npm start
   ```
8. **Access the API Documentation**: The Swagger API documentation will be available at.
   ```bash
   http://localhost:5000/api-docs

## API Routes

### Products
```bash
GET /api/v1/products: Get all products.
GET /api/v1/products/:id: Get a product by ID.
POST /api/v1/products: Add a new product.
PUT /api/v1/products/:id: Update a product.
DELETE /api/v1/products/:id: Delete a product.
```

### Orders
```bash
GET /api/v1/orders: Get all orders.
GET /api/v1/orders/:id: Get an order by ID.
POST /api/v1/orders: Create a new order.
PUT /api/v1/orders/:id: Update an order.
DELETE /api/v1/orders/:id: Delete an order.
```
### Users
```bash
GET /api/v1/users: Get all users.
GET /api/v1/users/:id: Get a user by ID.
POST /api/v1/users: Register a new user.
PUT /api/v1/users/:id: Update a user.
DELETE /api/v1/users/:id: Delete a user.
```
### Authentication
```bash
POST /api/v1/users/register: Register a new user.
POST /api/v1/users/login: Login a user and get a JWT token.
```
### Guidelines
Please follow the guidelines below to contribute effectively:
  ```bash 
  git checkout -b feat/API-your-feature
  ```

- **Write tests**: Ensure any new functionality is thoroughly tested.
- **Ensure code quality**: Adhere to the coding style and use ESLint for linting.
- **Submit a Pull Request**: Once you're happy with your changes, submit a pull request.

### Code Style
I follow standard JavaScript/TypeScript practices:
- Use camelCase for variable and function names.
- Use PascalCase for classes and interfaces.
- Indent with 2 spaces.
- Always write descriptive commit messages.
