const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const whatsappService = require('./services/whatsapp');

const webRoutes = require('./routes/web');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.use(expressLayouts);

app.set('io', io);
whatsappService.setIO(io);

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use('/', webRoutes);

app.use('/', (req, res) => {
    res.status(404)
    res.render('auth/errors/404', {
        layout: 'layouts/auth-layout',
        title: '404 | Page not found'
    })
})

server.listen(() => {
    console.log(`Server running`);
});