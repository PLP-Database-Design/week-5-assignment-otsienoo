// Declaring variables
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,   
    user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME    
});

// Checking if the database connection is working
db.connect((err) => {
    if (err) {
        console.error('Error Connecting To The Database:', err.message);
        return;
    }

    console.log('Connected To MySQL successfully as id:', db.threadId);

    // Set up view engine
    app.set('view engine', 'ejs'); 
    app.set('views', path.join(__dirname, 'views'));

    // GET method for patients
    // app.get('/patients', (req, res) => {
    //     db.query('SELECT patient_id, first_name, last_name, DATE_FORMAT(date_of_birth, "%Y-%m-%d") AS date_of_birth FROM patients', (err, results) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).send('Error Retrieving Patients Data');
    //         } 
    //         res.render('patients', { results });
    //     });
    // });

    // GET method for providers
    // app.get('/providers', (req, res) => {
    //     db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).send('Error Retrieving Providers Data');
    //         } 
    //         res.render('providers', { results });
    //     });
    // });

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

    // Root route
    app.get('/', (req, res) => {
        res.send('Server Started Successfully');
    });

    // Start the server
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
});
