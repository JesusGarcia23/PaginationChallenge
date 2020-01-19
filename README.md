# PaginationChallenge

# Short Explanation



# Long Explanation

 First I get the values from the query parameters attached to the end of the url (to be able to use them for the pagination).
 
    let allData = [...data]

    const dataLength = allData.length

    const by = req.query.by;
    const start = req.query.start;
    const end = req.query.end;
    const max = req.query.max || 50;
    const order = req.query.order;
  
 These variables are going to help with the logic

    let startIndex;

    let lastIndex = end || dataLength;

    let theOrder; 
     
 
 Here I'm checking if the variable `by` exists (must be) and making sure it matches `id` or `name` as required to proceed with the pagination
 
    if(by && (by === 'id' || by === 'name')) 
    
 After knowing variable `by` exists I proceed to get the items from data using the `start` and `end` (range parameters).
 Using the array method called `findIndex` to find the index of the item in the provided array

    const nameStartIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === start);

    const nameLastIndex = allData.findIndex(dataToSearch => dataToSearch[by].toString() === end);
    
But I have to make sure the range parameters are correct, so I check the value of the variables. If the index is equal or greater than 0
it means the item exists, so we proceed using it, otherwise the value would be the default 0.

    limit = max || dataLength;

    startIndex = nameStartIndex >= 0 ? nameStartIndex : 0;

    lastIndex = nameLastIndex >= 0 ?  nameLastIndex : limit;
 
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
    
 Once I get the array, I proceed to check the order wanted (asc by default)
 
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
      
 Finally returning the array of data in json file.
 
    res.json(allData)
  
    
    
