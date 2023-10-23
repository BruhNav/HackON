// Backend (Node.js with Express)
const express = require('express');
const mysql = require('mysql2');
const OpenAI = require("openai");
require('dotenv').config()

const port = 3000
const app = express();

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'hackonkeliye',
    password: 'hackonkeliye',
    database: 'hackondb',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getFilters(prompt) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices);
    return chatCompletion.choices[0].message.content;
}



app.get('/genai', async (req, res) => {
    const { search_entry } = req.query;
    if (search_entry) {
        try {
            const prompt = "Extract the brand name from the search term and return it as json ex. {'brand': 'samsung, 'price': 40000} \nSearch term: " + search_entry;
            const response = await getFilters(prompt);
            res.send(`${response}`);
        } catch (error) {
            console.error('Error with OpenAI:', error);
            res.status(500).send('An error occurred with OpenAI');
        }
    } else {
        res.send('I received no key-value pair.');
    }
});



app.get('/calculateWeightedPercentile/:given_subcategory', (req, res) => {
    const given_subcategory = req.params.given_subcategory;

    // Query to fetch the category of the given subcategory
    const categoryQuery = `
    SELECT category FROM useritems WHERE subcategory = ? LIMIT 1
  `;

    // Execute the SQL query to fetch the category
    db.query(categoryQuery, [given_subcategory], (err, categoryResult) => {
        if (err) {
            console.error('Error fetching category:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let category = null;

        if (categoryResult.length > 0) {
            category = categoryResult[0].category;
        }

        // Query to fetch products based on the given subcategory or category
        const productsQuery = `
        SELECT * FROM useritems
        `;

        // Execute the SQL query to fetch products
        db.query(productsQuery, [given_subcategory, category], (err, products) => {
            if (err) {
                console.error('Error fetching products:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Calculate the weighted percentile based on the specified weights
            let weightedSum = 0;
            let totalWeight = 0;

            products.forEach((product) => {
                if (product.subcategory === given_subcategory) {
                    weightedSum += product.percentile * 12;
                    totalWeight += 12;
                } else if (product.category === category) {
                    weightedSum += product.percentile * 3;
                    totalWeight += 3;
                }
                else {
                    weightedSum += product.percentile * 1;
                    totalWeight += 1;
                }
            });

            if (totalWeight === 0) {
                res.json({ given_subcategory, category, weightedPercentile: 50 });
            } else {
                const weightedPercentile = weightedSum / totalWeight;
                res.json({ given_subcategory, category, weightedPercentile });
            }
        });
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
