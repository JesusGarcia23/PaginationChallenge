require('dotenv').config();
const express = require('express');
const data = require('./data');
const app = express();
const PORT = 5000;

app.get('/app', (req, res) => {

    let allData = [...data]

    const dataLength = (allData.length)

    const by = req.query.by;
    const start = req.query.start;
    const end = req.query.end;
    const max = req.query.max;
    const order = req.query.order;

    let limit;

    let startIndex;

    let lastIndex = end || dataLength;

    let theOrder; 

    if(by === 'id') {

     limit = max || dataLength; 

     theOrder = order === 'desc' ? 'desc' : 'asc';

     startIndex = start > 0 ? start - 1 : 0

     lastIndex = limit < end ? limit : end

     allData = allData.slice(startIndex, lastIndex).slice(0, limit);

     switch(theOrder){
        
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

    }else if(by === 'name') {

    limit = max > 0 ? allData[max].name : allData[dataLength - 1].name;

     const nameStartIndex = allData.findIndex(dataToSearch => dataToSearch.name === start);
 
     const nameLastIndex = allData.findIndex(dataToSearch => dataToSearch.name === end);
    
     const nameLimit = allData.findIndex(dataToSearch => dataToSearch.name === limit);

     theOrder = order === 'desc' ? 'desc' : 'asc';

     startIndex = nameStartIndex >= 0 ? nameStartIndex : 0;

     lastIndex = nameLastIndex >= 0 ? nameLastIndex : nameLimit;

     allData = allData.slice(startIndex, lastIndex + 1).slice(0, nameLimit);


     switch(theOrder){

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

    //console.log(allData)
    res.json(allData)
})

app.listen(PORT, console.log(`SERVER LISTENING ON ${PORT}`))


//BY NAME
//http://localhost:5000/app?by=name&start=my-app-008&end=my-app-013&max=7&order=desc


//BY ID
//http://localhost:5000/app?by=id&start=5&end=20&order=desc