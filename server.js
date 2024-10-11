const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(express.static('public')); // Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample user for login (In a real application, use a database)
const users = [{ email: 'hcl@gmail.com', password: bcrypt.hashSync('hcl123', 10) }];

// Login route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // Store user in session
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

// Dashboard route (protected)
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/index', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/income-calculator', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'income-calculator.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/property-calculator', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'property-calculator.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/service-calculator', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'service-calculator.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/wealth-calculator', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'wealth-calculator.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/gst-calculator', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'gst-calculator.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for stored taxes page
app.get('/stored-taxes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stored-taxes.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


