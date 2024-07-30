
# Cartoonopia Web Application

Assignment2 is a full-stack web application development project based on Node.js, aimed at providing a secure and efficient user data processing platform. This project uses the Express framework to build the server side, EJS as the templating engine for front-end rendering, and MongoDB for data management. Additionally, the project integrates the Multer and Bcrypt libraries to support file uploads and password encryption, ensuring functionality and security. 
## Getting Started

These instructions will help you get a copy of the Assignment2 project up and running on your local machine for development and testing purposes.

### Prerequisites

Before starting, you need to install Node.js and npm. You will also need to install the following dependencies:

- express
- mongoose
- ejs
- bcrypt
- multer

```bash
npm install
```

### Installation

Follow these steps to set up the development environment locally:

1. Unzip the downloaded project files.
2. Open the project directory with PyCharm or any IDE of your choice.
3. First create a database in the local Mongo DB: Assignment2_Lab12 database, then create 5 **collections**, the names of the collections are **adminlist**, **characters**, **contributions,** **favorites** and **userlist**, then import the **json** file（in the **dataset**） with the corresponding name, and finally find the app in the project /models/db.js, change the uri in the file to the local uri: **"mongodb://localhost:27017/Assignment2_Lab12"**
4. Install the necessary dependencies in the IDE terminal:

```bash
cd Assignment2-Full Stack
npm install
```

Start the project:

```bash
node app.js
```
Or open app.js and right-click **"Run"**

### Running Tests

Enter [http://localhost:3000/](url) on the web page to open the project
### Administrator account: 
Email: adm123@gmail.com

password: 123456

### User account: 

Email: User123@gmail.com

password: 123456

Test with these two different accounts

## Built With
- **Node.js**- The runtime environment
- **Express** - The web application framework
- **MongoDB** - The database management system
- **EJS**- The templating engine
- **Multer** - The middleware for handling file uploads
- **Bcrypt** - The library for hashing passwords

## License

This project is licensed under the ISC License.
#   N o d e . j s 
 
 
