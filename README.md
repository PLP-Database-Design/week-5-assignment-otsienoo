# Database Interacation in Web Applications

This demonstrates the cconnection of MySQL database and Node.js to create a simple API

## Requirements
- [Node.js](https://nodejs.org/) installed
-  MySQL installed and running
-  A code editor, like [Visual Studio Code](https://code.visualstudio.com/download)

## Setup
1. Clone the repository
2. Initialize the node.js environment
   ```
   npm init -y
   ```
3. Install the necessary dependancies
   ```
   npm install express mysql2 dotenv nodemon
   ```
4. Create a ``` server.js ``` and ```.env``` files
5. Basic ```server.js``` setup
   <br>
   
   ```js
   const express = require('express')
   const app = express()

   
   // Question 1 goes here

   //EJS
   <table>
    <thead>
        <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
        </tr>
    </thead>
    <tbody>
        <% results.forEach(row => { %>
            <tr>
                <td><%= row.patient_id %></td>
                <td><%= row.first_name %></td>
                <td><%= row.last_name %></td>
                <td><%= row.date_of_birth %></td>
            </tr>
        <% }); %>
    </tbody>
</table>

//node.js
  // GET method for patients
    app.get('/patients', (req, res) => {
        db.query('SELECT patient_id, first_name, last_name, DATE_FORMAT(date_of_birth, "%Y-%m-%d") AS date_of_birth FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error Retrieving Patients Data');
            } 
            res.render('patients', { results });
        });
    });

   // Question 2 goes here
   //EJS
   <div>
    <h1>Providers List</h1>
    <table>
        <thead>
            <tr>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Specialty</th>
            </tr>
        </thead>
        <tbody>
            <% results.forEach(row => { %>
                <tr>
                    <td><%= row.first_name %></td>
                    <td><%= row.last_name %></td>
                    <td><%= row.provider_specialty %></td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</div>

//node.js
    // GET method for providers
    app.get('/providers', (req, res) => {
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error Retrieving Providers Data');
            } 
            res.render('providers', { results });
        });
    });

   // Question 3 goes here
   // Endpoint to filter patients by first name
app.get('/patients', (req, res) => {
    const { first_name } = req.query; // Extract the first_name from the query parameters

    // Check if first_name is provided
    if (!first_name) {
        return res.status(400).send('First name is required');
    }
    // SQL query to get patients filtered by first name
    const query = 'SELECT patient_id, first_name, last_name, DATE_FORMAT(date_of_birth, "%Y-%m-%d") AS date_of_birth FROM patients WHERE first_name = ?';

    // Execute the query
    db.query(query, [first_name], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Error retrieving patients data');
        }

        // If no patients found
        if (results.length === 0) {
            return res.status(404).send(`No patients found with the first name: ${first_name}`);
        }

        // Render the filtered results (assuming you have a patients.ejs template)
        res.render('patients', { results });
    });
});

   // Question 4 goes here

   // Endpoint to filter providers by specialty
app.get('/providers', (req, res) => {
    const { specialty } = req.query; // Extract the specialty from the query parameters

    // Check if specialty is provided
    if (!specialty) {
        return res.status(400).send('Specialty is required');
    }

    // SQL query to get providers filtered by specialty
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

    // Execute the query
    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Error retrieving providers data');
        }

        // If no providers found
        if (results.length === 0) {
            return res.status(404).send(`No providers found with the specialty: ${specialty}`);
        }

        // Render the filtered results (assuming you have a providers.ejs template)
        res.render('providers', { results });
    });
});


   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })
   ```
<br><br>

## Run the server
   ```
   nodemon server.js
   ```
<br><br>

## Setup the ```.env``` file
```.env
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

<br><br>

## Configure the database connection and test the connection
Configure the ```server.js``` file to access the credentials in the ```.env``` to use them in the database connection

<br>

## 1. Retrieve all patients
Create a ```GET``` endpoint that retrieves all patients and displays their:
- ```patient_id```
- ```first_name```
- ```last_name```
- ```date_of_birth```

<br>

## 2. Retrieve all providers
Create a ```GET``` endpoint that displays all providers with their:
- ```first_name```
- ```last_name```
- ```provider_specialty```

<br>

## 3. Filter patients by First Name
Create a ```GET``` endpoint that retrieves all patients by their first name

<br>

## 4. Retrieve all providers by their specialty
Create a ```GET``` endpoint that retrieves all providers by their specialty

<br>


## NOTE: Do not fork this repository
