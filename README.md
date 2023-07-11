# Real-Time Chat Website with MERN Stack, Socket.io, Redux Toolkit, and Tailwind CSS

This is a real-time chat website that allows users to connect with each other and chat in real-time. It was built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Socket.io, Redux Toolkit, and Tailwind CSS. 

- If you liked it then give this Repository a Star⭐
- Youtube Demo : <a target="__blanck" href="https://youtu.be/11oZj2jBhOE">Click On Me</a>

## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, and Node.js)
- Socket.io
- Redux Toolkit
- Tailwind CSS

## Features

- Real-time chat: users can send and receive messages in real-time
- User authentication: users can sign up, log in, and log out using JWT and Google Auth
- Group creation: users can create chat rooms and invite others to join
- Notifications: users can receive notifications on new messages
- Emojis: users can send and receive emojis in messages
- Profile page where users can update their avatar and display name.
- Users can create a room to chat with others.
- Search functionality.
- Responsive design: the website is optimized for different screen sizes and devices

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_GOOGLE_CLIENT_ID = 
REACT_APP_SERVER_URL='http://localhost:8000'
```

To get your Google ClientID for authentication, go to the [credential Page ](https://console.cloud.google.com/apis/credentials) (if you are new, then [create a new project first](https://console.cloud.google.com/projectcreate) and follow the following steps;

- Click Create credentials > OAuth client ID.
- Select the Web application type.
- Name your OAuth client and click Create
- Remember to provide your domain and redirect URL so that Google identifies the origin domain to which it can display the consent screen. In development, that is going to be `http://localhost:3000` and `http://localhost:3000/login`
- Copy the Client ID and assign it to the variable `REACT_APP_GOOGLE_CLIENT_ID` in your .env file

```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
PORT=8000
URL=
SECRET=
CLIENT_ID=
BASE_URL="http://localhost:3000"
```
```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```


## Contributing

Contributions to this project are welcome! If you find a bug or want to add a feature, please submit an issue or a pull request. To contribute, follow these steps:

1. Fork the repository
2. Create a new branch for your feature: `git checkout -b my-new-feature`
3. Make changes and commit them: `git commit -m 'Add some feature'`
4. Push your branch to your forked repository: `git push origin my-new-feature`
5. Create a Pull Request

