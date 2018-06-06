const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

/* Register Partials */
hbs.registerPartials(__dirname + '/views/partials');


/* Says than we use hbs tempaltes*/
app.set('view engine', 'hbs');



/* Called when a page is loading*/
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if(err){
           console.log('Unable to append to server.log');
       }
    });
    next();
});

/* Redirects to maintenance.hbs on load */
app.use((req, res, next) => {
   res.render('maintenance.hbs');
});


/* Defines the partials' folder*/
app.use(express.static(__dirname + '/public'));


/* Defines an universal variable, which is usable in all classes*/
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/json', (req, res) => {
    /* Show JSON*/
    res.send({
       name: 'Corentin',
       likes: [
           'Biking',
           'Travelling',
           'Coding'
       ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        /* Inject data into the page */
        pageTitle: 'About Page'
    });
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Loreus minus linux archeus'
   }) ;
});



app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    }) ;
});


app.get('/bad', (req, rep) => {
   rep.send({
       error_code: 404,
       error_message: 'FILE_NOT_FOUND'
   });
});

var port = 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});