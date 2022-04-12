// Using callback patterns to return async data
const add = (x, y, callback) => {
    setTimeout(() => {
        callback(x + y);
    }, 2000);
};

// sample callback function
add(1, 4, (sum) => {
    console.log(sum); // Should print: 5
});
