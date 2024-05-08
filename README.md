# Contact Management Web Application with User Authentication

This is the Backend of the Contact Management Web Application with user authentication. It consists of a Backend RESTful API built with NestJS and MongoDB. User authentication is implemented using JWT (JSON Web Tokens) for secure login and registration.

The service of this API is called throught the Frontend web application.

You can clone the Frontend from its Repository
-> git clone https://github.com/Kingsintersect/hux-assesment-Backend.git.

Open its README file and follow the instructions run the features of the application

## System Requirements
1. Make sure you have the NodeJS installed and running on your system.
2. Make sure you have MongoDB installed and running on your system.

### Backend
1. Clone the repository:
-> git clone https://github.com/Kingsintersect/hux-assesment-Backend.git
2. Enter into the project folder
-> cd hux-assesment-Backend


## Installation
1. Run the command below to Install the dependencies needed for this application
-> npm install

2. Environment Variables
-> create a .env file in the root dirotory of the project. copy the next 4 lines of code and past in it
PORT=4000;
MONGODB_URI=mongodb://127.0.0.1:27017/hux-contact-management
JWT_SECRET=q2Tmj4GD/Z40y3cKdLY7PfG9uC9h+DYbY5CQ0s7MeTk=
JWT_EXPIRATION=3600

## Start the Backend Server
-> npm run start:dev

## Running the application
Once both the Backend and Frontend servers are running, open your web browser and navigate to http://localhost:3000 to access the application from the Frontend which will call the this Backend APIs.

Use the provided form to register a new user with a username and password.

After registering, you can login with the registered username and password.

You can then use the contact management features to add, view, update, and delete contacts.

To logout, simply click on the logout button

- NOTE  token is valid only for 1 Hour before it expires;

## Technologies Used
NestJS
MongoDB
Mongoose
Passport.js
bcryptjs
JSON Web Tokens (JWT)
Joi  => for environment Variable validation during compilation
class-validator => for  incoming data validation
