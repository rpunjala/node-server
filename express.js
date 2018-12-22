const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3002;
var app = express();

hbs.registerHelper('getCurrentYear', () =>{
return new Date().getDate()   
})

hbs.registerHelper('Screamit', (text) => {
  return text.toUpperCase();  
})

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

var now = new Date().toString();

var serverlog = `${now} : ${req.method} : ${req.url} `;

console.log(serverlog);

fs.appendFileSync('server.log', serverlog + '\n' );

next();
});

// app.use((req,res, next) => {

//   res.render('Maintanance.hbs');  
//  next();
//   });


app.get('/', (req,res) => {

// res.send('<h2>Hello Express<h2>');
res.render('MainPage.hbs',{
    Hobby1:'Chess',
    Hobby2:'Cricket',
    Hobby3:'Movies',
    Hobby4:'Money',
    WelComeMessage : 'Welcome To Main Page',
    pageHeading : 'Man Page'
})

}); 

app.get('/about', (req,res) => {
  
res.render('about.hbs', {
    pageHeading : 'Abot Page',
})  
});

app.get('/bad', (req,res) =>{

res.send ({
  errorMessage : 'Unable to fetch the page'  
})
});

app.get('/projects', (req,res) =>{

  res.render('projects.hbs', {
  Projects : "My Projects"
  })
 
  });

app.listen(port, () =>{
console.log(`Server is up on port ${port}`); 

});