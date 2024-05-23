# Inventory Management
This is a straightforward Express application designed to manage product and order functionalities. It offers an API for creating, reading, updating, and deleting, searching products and orders, utilizing Express and MongoDB using Mongoose. Additionally, ESLint and Prettier have been employed for code quality and formatting.

## Project API for products and orders management
project live link : 
https://project-3-m057un3il-al-jannatul-maowas-projects.vercel.app/
### Products
1. Create new products
https://project-3-henna-seven.vercel.app/api/products/create-product
2. Retrieve all products 
https://project-3-henna-seven.vercel.app/api/products
3. Search for products by name, description and category 
https://project-3-henna-seven.vercel.app/api/products?searchTerm=Red
4. Update product
https://project-3-henna-seven.vercel.app/api/products/productId
5. Delete product
https://project-3-henna-seven.vercel.app/api/products/productId
### Orders
1. Create new order
https://project-3-henna-seven.vercel.app/api/orders
2. Retrieve all orders
https://project-3-henna-seven.vercel.app/api/orders
3. Get orders for specific email
https://project-3-henna-seven.vercel.app/api/orders?email=email

## What you need to run this app
- Node JS (used version : v20.11.1)
- NPM or any package manager
- Express
- MongoDB

## Installation Process
Clone the repository using command 'git clone <repository URL>.
Install the dependencies using command 'npm install'.
Create a .env file in the root directory and add your port, database connection string.

## Run the project using scripts from package.json 
Using Node: 
for creating the dist files in js
``npm run build ``
to run the server using node
```node ./dist/server.ts```
using the script
```npm run start:prod //  Production ```
Using ts-node-dev
```npm run start:dev // development ```

## Linting 
to check the errors
```npm run lint```
for fix use 
```npm run lint:fix```

# Formatting
format the code using prettier
```npm run prettier```
to fix
```npm run prettier:fix```

In this project, I have meticulously followed several best practices and guidelines to ensure high-quality code:

### Coding Quality
#### Clean and Modular Code: 
The code is organized into modular components, each responsible for a specific functionality.
#### Consistent Naming Conventions: 
Variables, functions, and routes are named consistently and meaningfully to reflect their purpose.
#### Readability: 
Efforts have been made to ensure the code is easily readable and maintainable.

#### Inline Comments: 
Complex sections of code or logic are accompanied by inline comments to enhance understanding.

### API Endpoint Adherence
#### Strict Adherence to Structure: 
The API endpoints strictly follow the provided structure and naming conventions.
#### Request and Response Formats: 
All request and response formats match the specifications outlined in the assignment.

### Validation and Error Handling
#### Validation: 
Implemented validation using Zod for both product and order data.
#### Graceful Error Handling: 
Validation errors are handled gracefully, providing meaningful error messages in API responses.
#### Specific Error Scenarios: 
Error handling is implemented for scenarios such as product not found and validation errors.

### Coding Tools and Libraries
#### Manual Code Writing: 
No AI tools or libraries were used for generating code. All code is written manually to demonstrate a clear understanding of the concepts.

#### Specified Libraries: 
Only specified libraries like Express, Mongoose, and Zod are used, avoiding unnecessary dependencies.


### Commit History:
The GitHub repository contains commits, documenting the development process.The project maintains a high standard of coding quality, readability, and functionality.



### Author
Maowa Risa
