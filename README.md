1. **No Git Repository Initialized:** You may not have initialized a Git repository in the directory where you're running the `git status` command. In that case, you need to initialize a new Git repository using the `git init` command.

   ```bash
   git init
   ```

2. **Incorrect Directory:** You might be running the `git status` command in a different directory than the one where your Git repository is located. Make sure you are in the correct directory by using the `cd` command to navigate to the directory where your project files are stored.

   ```bash
   cd /path/to/your/project/directory
   ```

3. **.gitignore:** add below into .gitignore & data from https://www.toptal.com/developers/gitignore/api/node

   ```bash
   package-lock.json
   ```

4. **Add all untracked files and changes**

   ```bash
   git add .
   ```

5. **Commit the changes with a message**

   ```bash
   git commit -m "Initial commit"
   ```

6. **Create a repo in githu and execute these**

   ```bash
   git remote add origin https://github.com/FebzLeoCena/MERN-Auth-App.git
   git branch -M main
   git push -u origin main
   ```

7. **To push evrytime to github**

   ```bash
   git push origin main
   ```

8. **Install Redux Toolkit and React-Redux:**Add the Redux Toolkit and React-Redux packages to your project.

```bash
npm install @reduxjs/toolkit react-redux
```

9. **Redux Persist**, `redux-persist` is a library that enables you to persist your Redux store's state to storage and then rehydrate it from storage when the application reloads. This is particularly useful for preserving user sessions, caching data, or maintaining application state across sessions.

Here's a basic usage example of `redux-persist`:

a. **Installation**: First, you need to install `redux-persist`:

```bash
npm install redux-persist
```

b. **Setup**: After installing, you need to configure `redux-persist` in your Redux store setup. Typically, you do this in your store configuration file (e.g., `store.js`):

```javascript
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './reducers'; // assuming you have your root reducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

c. **Usage in Application**: With `redux-persist` configured, your Redux store will automatically persist its state to storage according to the provided configuration. You can use your Redux store as usual in your application.

d. **Rehydration**: When your application initializes or reloads, `redux-persist` will automatically rehydrate the Redux store's state from storage. This ensures that your application starts with the previously saved state.

```javascript
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
```

In this setup:

- `PersistGate` is a component provided by `redux-persist` that delays the rendering of your application's UI until the persisted state has been retrieved and saved to the Redux store.
- `loading` prop defines the UI to be rendered while rehydration is in progress. You can set it to `null` for no loading UI.
- `persistor` is passed to `PersistGate` to coordinate the loading and persisting of state.

This setup will persist your Redux store's state to local storage by default. However, you can configure it to use other storage options, such as AsyncStorage for React Native apps or custom storage engines. Check the `redux-persist` documentation for more advanced configurations and options.

9. **Firebase**: firebase config

   ```bash
   npm i firebase
   ```

10. **Redux persist**: to push the store into the local storage

```bash
npm i redux-persist
```

11. **Cookie Parser**:install out of the client side

```bash
npm i cookie-parser
```

12.**Build**:`package.json` file:

```json
"scripts": {
"dev": "nodemon api/index.js",
"start": "node api/index.js",
"build": "npm install && npm install --prefix mern-auth-yt && npm run build --prefix mern-auth-yt"
},
```

The `build` script typically refers to a set of commands that prepare an application for deployment. In this specific script:

- `npm install`: This command installs dependencies for the server-side part of the application.
- `npm install --prefix mern-auth-yt`: This command installs dependencies for the client-side part of the application, assuming that the client-side code is located in a directory named `mern-auth-yt` within the project directory.
- `npm run build --prefix mern-auth-yt`: This command runs the build script for the client-side code, which could involve tasks such as transpilation, bundling, minification, and other optimizations. The `--prefix mern-auth-yt` option ensures that the command is executed within the `mern-auth-yt` directory.

In summary, the `build` script is responsible for preparing both the server-side and client-side parts of the application for deployment by installing dependencies and building the client-side code. This script is often used in projects that have separate server and client directories, such as full-stack web applications or projects that use front-end frameworks like React, Vue.js, or Angular.

**Build Command**
This command runs in the root directory of your repository when a new version of your code is pushed, or when you deploy manually. It is typically a script that installs libraries, runs migrations, or compiles resources needed by your app.

```bash
npm run build
```

**Start Command**
This command runs in the root directory of your app and is responsible for starting its processes. It is typically used to start a webserver for your app. It can access environment variables defined by you in Render.

```bash
npm start
```
