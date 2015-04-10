

////
//Used as a container for Data Management
//
//~!FYI!~
// 
// localStorage is a HTML5 functionality that will save 
// permanently to the browser until cleared.
// 
// sessionStorage only contains the saved data from the 
// current session.
////
var DataMan = {};

////
// loads in the data from the storage container
// 'storage' could be 'localStorage' or 
// 'sessionStorage'.
////
DataMan.loadData = function(array, storage)
{
    for(var i in storage)
    {
        //push data onto the array
        array.push( JSON.parse(storage.getItem( i )) );
    };
    return array;
};

////
// In order to keep the managment simple of saving data. 
// A for loop is used to cycle through the required array
// and applies that index information to a variable inside
// the 'storage' container. Once again, 'storage' could be
// 'localStorage' or 'sessionStorage'.
DataMan.saveData = function(array, storage, name)
{
    for(var i in array)
    {
        if(array[i] !== null && array[i] !== undefined && storage[i] === undefined)
        {
            // setItem(key, value)
            storage.setItem(name + i.toString(), JSON.stringify(array[i]));
        }
        
        //If the current index in storage is not vacant
        // keep searching through until one is vacant and
        // save off data
        if(storage[i] !== undefined && storage[i + 1] === undefined)
        {
            var incr = i;
            do
            {
                incr++;
            }
            while(storage[incr] !== undefined)
                
            storage.setItem(name + (incr).toString(), JSON.stringify(array[i]));
        }
    }
};
