# PaginationChallenge

# Short Explanation

First I get the values from the query parameters attached to the end of the url with `req.query` (to be able to use them for the pagination). And some variables for the logic
 
    let allData = [...data] // array of data

    const by = req.query.by;
    const start = req.query.start;
    const end = req.query.end;
    const max = Number(req.query.max) > 1 ? req.query.max : 50;
    const order = req.query.order; 
    
 Check if `by` exists and if it matches `id` or `name`. Then I find the range according the `start` and `end` and making sure 
 the item is in the provided array `allData`, and slicing the array to have only the wanted data with the following methods:
 
    const nameStartIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === start);

    const nameLastIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === end);
 
    const startIndex = nameStartIndex >= 0 ? nameStartIndex : 0;

    const lastIndex = nameLastIndex >= 0 ?  nameLastIndex : 50;
    
    allData = allData.slice(startIndex, lastIndex).slice(0, max);
    
  Finally sorting the array depending `asc` (by default) or `desc`
  
    theOrder = order === 'desc' ? 'desc' : 'asc';
     
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
  
 Finally sending the data as json file.
 
    res.json(allData)


# Long Explanation

 First I get the values from the query parameters attached to the end of the url using `req.query` (to be able to use them for the pagination).
 
    let allData = [...data] // array of data

    const by = req.query.by;
    const start = req.query.start;
    const end = req.query.end;
    const max = Number(req.query.max) > 1 ? req.query.max : 50;
    const order = req.query.order;
  
 These variables are going to help with the logic

    let startIndex;

    let lastIndex;

    let theOrder; 
     
 
 Here I'm checking if the variable `by` exists (must be) and making sure it matches `id` or `name` as required to proceed with the pagination
 
    if(by && (by === 'id' || by === 'name')) 
    
 After knowing variable `by` exists I proceed to get the items from data using the `start` and `end` (range parameters).
 Using the array method called `findIndex` to find the index of the item in the provided array

    const nameStartIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === start);

    const nameLastIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === end);
    
But I have to make sure the range parameters are correct, so I check the value of the variables. If the index is equal or greater than 0
it means the item exists in `allData`, so we proceed using it, otherwise the value would be the default 0.


    startIndex = nameStartIndex >= 0 ? nameStartIndex : 0;

    lastIndex = nameLastIndex >= 0 ?  nameLastIndex : 50;
 
 I used ternary operators, but the translation of the code above would be something like:
 
    if(nameStartIndex >= 0) {
      startIndex = nameStartIndex 
    }else {
      startIndex = 0
    }
    
    if(nameLastIndex >= 0) {
      lastIndex = nameLastIndex
    }else {
      lastIndex = max
    }
    
 Now I have the indexes I proceed to slice the array to get the specific data following the range parameters
  
     allData = allData.slice(startIndex, lastIndex).slice(0, max);
    
 Once I get the array with the data wanted, I proceed to check the order wanted (asc by default)
 
     theOrder = order === 'desc' ? 'desc' : 'asc';
     
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
      
 Finally returning the array of data as json file.
 
    res.json(allData)
  


# URL TO TEST THE ENDPOINT

APP
https://secure-hollows-01712.herokuapp.com/apps

BY NAME
https://secure-hollows-01712.herokuapp.com/apps?by=name&start=my-app-001&end=my-app-050&max=10&order=asc

BY ID
https://secure-hollows-01712.herokuapp.com/apps?by=id

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=1

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=1&end=5

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=5

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=1&max=5

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=1&order=desc

https://secure-hollows-01712.herokuapp.com/apps?by=id&start=5&end=10&max=10&order=asc

    
