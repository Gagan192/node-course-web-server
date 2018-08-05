const express = require('express');
const hbs =require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // Command line to used to allow access to header files in our pages

app.set('view engine' , 'hbs');

app.use((req , res ,next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err)=>{
    console.log('Unable to append to server.log');
  });
  next();
});

// app.use((req , res , next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: 'Under maintenance',
//     welcomeMessage : 'We will be back with some new update in a few minutes'
//   });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear' , ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text)=>{
  return text.toUpperCase();
});

app.get('/' , (req , res)=> {

  res.render('home.hbs', {
    pageTitle:'Home Page' ,
    welcomeMessage: 'Welcome To My Website' ,
  //  currentYear: new Date().getFullYear()
  });

  // res.send('<h1>Hello express!<h1>');


  // res.send({
  //   name: 'Gagan',
  //   likes: [
  //     "Biking",
  //     "Cycling"
  //   ]
  // });
});

app.get('/about' , (req , res) => {
  //res.send('About Page');
 res.render('about.hbs',{
   pageTitle: 'About Page',
   //currentYear: new Date().getFullYear()
 });
});


app.get('/bad' , (req , res)=>{
  res.send({
      errorMessage: 'Unable to fulfill that request'
  });
});

app.listen(3000 , ()=>{
  console.log('Server is up on port 3000');
});
