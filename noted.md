### Creating RestfulAPI USING NODEJS and MONGODB

- Create a folder called `server` or `api`
- `cd server`
- Install frameworks, libraries like `expressjs`, `mongoose`, `dotenv`, `multer`
- add a new key-value to package.json file `"type": "module"`
- Create a simple express server in `app.js` that listen on port `5000`
- Start your express server by first adding a start script to package.json file
`start: node app.js`
- Run npm start in the vscode terminal
- You should see the string in the 
`app.listen("5000", () => console.log("It all start from localhost"));`
`it all start from localhost`
- Now that we are able to start our application, we need to install that will always detect changes in our code `nodemon`
- Then change the start script to: 
`"start": "nodemon app.js"`
- Try add new code to see the chages in the terminal
- Create `.env` at the root and add the connection string from mongodb
- Connect to the database
- Next thing is create models and routes. Inside of the api folder, create models folder and create `User.js`, `Post.js` and `Category.js` in the models folder. Also add the `auth.js` `users.js`, `posts.js` and `categories.js` in the routes folder.
  - Create User model in models/User.js
  - Create Post model in models/Post.js
  - Create Category model in models/Category.js
- Next is to create routes
- In the auth.js, create auth route: register, login.
- Import auth route in app.js file and test the route with testing application like `postman`
  `import authRoute from "./routes/auth.js";`


  then
  `app.use("/api/auth", authRoute);`

- To hash password, we can use hashing library `bcrypt`, run `npm install bcrypt`
- Import bcrypt in the auth.js file to hash user password
- hash the password and create a new user with hash password
- Next create login route, find user and compare the input with the password saved in DB.
- To avoid sending along with user info is not a best practices.
- This can be achieved by omitting pasword from user information through destructuring of the user object

```js
{
    "_id": "6658ebca9420f6ab1930d96a",
    "username": "kehinde",
    "email": "b@gmail,com",
    "profilePic": "",
    "createdAt": "2024-05-30T21:12:42.291Z",
    "updatedAt": "2024-05-30T21:12:42.291Z",
    "__v": 0
}
```