import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Create the __dirname constant in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializing the Express app
const app = express();
const PORT = process.env.PORT || 3000;

//  EJS as templating engine
app.set('view engine', 'ejs');

//  Static files (CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route that fetches a random cocktail
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = response.data.drinks[0];
    res.render('index', { cocktail });
  } catch (error) {
    res.render('index', { cocktail: null, error: 'Failed to fetch cocktail' });
  }
});

// API route to fetch a new cocktail 
app.get('/api/cocktail', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    res.json(response.data.drinks[0]); // Send the cocktail data as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cocktail' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
