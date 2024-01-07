const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');

app.use('/auth', authRoutes); // Authentication routes
app.use('/crud', crudRoutes); // CRUD routes

// Default route - Redirect to login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/login.html'));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
