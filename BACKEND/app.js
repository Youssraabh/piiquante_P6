const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
require('dotenv').config();


// Déclaration des routes
const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/User');

// Connexions à mongoDB
mongoose.connect(`mongodb+srv://youssra:YOussra@cluster0.jnptk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

const app = express();

// Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Conversion en JSON
app.use(express.json());

// Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Lancement helmet
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); //Pour interdire d'inclure cette page dans une iframe*/

// Lancement et config rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Pour 15 min
  max: 100 // limite de 100 requests 
});

app.use(limiter);

// Sécurité 
app.use(mongoSanitize()); // Mongo sanitize pour assainir les entrées contre les attaques par injection
app.use(morgan("combined")); // Morgan middleware pour creer des logs

// Lancement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;