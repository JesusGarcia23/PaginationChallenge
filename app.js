require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');
const path = require('path');
const data = require('./data');
const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('https://secure-hollows-01712.herokuapp.com/apps');
})

app.get('/apps', (req, res) => {

    let allData = [...data]

    const by = req.query.by;
    const start = req.query.start || 0;
    const end = req.query.end || 0;
    const max = Number(req.query.max) > 1 ? req.query.max : 50;
    const order = req.query.order;

    if(by && (by === 'id' || by === 'name')) {

        const nameStartIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === start);

        const nameLastIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === end);
        
        const startIndex = nameStartIndex >= 0 ? nameStartIndex : 0;

        const lastIndex = nameLastIndex >= 0 ?  nameLastIndex : 50;

        allData = allData.slice(startIndex, lastIndex + 1).slice(0, max);

        const theOrder = order === 'desc' ? 'desc' : 'asc';

        switch(theOrder) {
        
                case 'desc': {
                    allData = allData.sort((a, b) => {
                        if (b[by] > a[by]) {
                            return 1;
                        }else if(b[by] < a[by]) {
                            return -1;
                        }else{
                            return 0;
                        }
                    })
                    break;
                }
        
                default: {
                   allData = allData.sort((a, b) => {
                        if (a[by] > b[by]) {
                            return 1;
                        }else if(a[by] < b[by]) {
                            return -1;
                        }else{
                            return 0;
                        }
                    })
                }

    }
}

    res.json(allData)
})

app.get((req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/index.html");
  });

module.exports = app;


//ALL TESTS

//BY NAME
//http://localhost:5000/apps?by=name&start=my-app-001&end=my-app-050&max=10&order=asc


//BY ID
//http://localhost:5000/apps?by=id
//http://localhost:5000/apps?by=id&start=1
//http://localhost:5000/apps?by=id&start=1&end=5
//http://localhost:5000/apps?by=id&start=5
//http://localhost:5000/apps?by=id&start=1&max=5
//http://localhost:5000/apps?by=id&start=1&order=desc
//http://localhost:5000/apps?by=id&start=5&end=10&max=10&order=asc

