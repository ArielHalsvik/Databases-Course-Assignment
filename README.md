# Course Assignment Information

This is a Database Course Assignment I got in the second semester of my Backend development degree. The task was to create the back-end code for an Animal adoptions web application using MySQL database. The front-end was already premade for this assignment and was only changed if it was required to make my back-end code functional This task was done by me alone.

The *Initial Commit* is the original code I got for the assignment.

The *Final Commit* is my finished code that I sent in for the assignment.

# Application Installation and Usage Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ArielHalsvik/Databases-Course-Assignment
    ```

2. **Open the Terminal:**
    ```bash
    npm install
    ```

3. **Create an .env file:**
    - Create an .env file.
    - Paste in the text from *Environment Variables* down below.

4. **Create the Database:**
    - Open the mySQL application.
    - Paste the text from *DATABASE* down below into mySQL and run it.

5. **Create a user:**
    - Paste the text from *DATABASEACCESS* down below into mySQL and run it.

6. **Open the terminal again:**
    ```bash
    npm start
    ```

7. **Open the Application:**
    - Open a web browser.
    - Input this link: http://localhost:3000/

8. **Fill the Database with Data**
    - Click on the *Populate Database* button on the home page.

## Website functionality

### Sign in

Create a user at the sign up page, or sign in with the preloaded data from public/json/user.json file.

### Animals

On the Animals page, users with the *Member* role (default sign up role) can adopt animals if they're not adopted yet.

All users and guests can filter through the animals with the buttons on top of the page.

Only Admins can see numbers of Animals per size or cancel any adoption.

### Species and Temperament

Only Admins have access to the Species and Temperament routes, and can change, add or delete data from here.

# Environment Variables

The following environment variables are required to run the application:

ADMIN_USERNAME = "dabcaowner"<br>
ADMIN_PASSWORD = "dabca1234"<br>
DATABASE_NAME = "adoptiondb"<br>
DIALECT = "mysql"<br>
DIALECTMODEL = "mysql2"<br>
PORT = "3000"<br>
HOST = "localhost"<br>


# Additional Libraries/Packages

This program was made using Express Framework with the EJS template engine.

Additional libraries/packages were used in this project.

**Express JS**
- https://expressjs.com/

**EJS**
- https://ejs.co/

**Bootstrap**
- https://getbootstrap.com/

**Passport JS**
- https://www.passportjs.org/

**Sequelize**
- https://sequelize.org/

**MySQL**
- https://github.com/mysqljs/mysql

**MySQL2**
- https://github.com/sidorares/node-mysql2

**SQLite3**
- https://github.com/TryGhost/node-sqlite3

**Connect SQLite3**
- https://github.com/rawberg/connect-sqlite3

**Dotenv**
- https://github.com/motdotla/dotenv

**Cookie Parser**
- https://github.com/expressjs/cookie-parser/tree/master

# NodeJS Version Used

NodeJS v20.10.0

# DATABASE

``
CREATE DATABASE adoptiondb;
``

# DATABASEACCESS

``
CREATE USER 'dabcaowner'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dabca1234';
``<br>
``
GRANT ALL PRIVILEGES ON adoptiondb.* TO 'dabcaowner'@'localhost';
``
