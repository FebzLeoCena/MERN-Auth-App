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

4. ```bash
   git add .
   ```
   # Add all untracked files and changes
5. ```bash
   git commit -m "Initial commit"
   ```

   # Commit the changes with a message

6. **Create a repo in githu and execute these**

   ```bash
   git remote add origin https://github.com/FebzLeoCena/MERN-Auth-App.git
   git branch -M main
   git push -u origin main
   ```

7. **Install Redux Toolkit and React-Redux:**Add the Redux Toolkit and React-Redux packages to your project.

```bash
npm install @reduxjs/toolkit react-redux
```
