// Object property shorthand
const name = 'Joseph';
const userAge = 33;

const user = {
    name,
    age: userAge,
    location: 'Los Angeles',
};

console.log(user);

// Object Destructuring
const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
};

// Store value in a variable
// const label = product.label;
// const stock = product.stock;

// Destructuring -- improved syntax
const { label: productLabel, stock, rating = 5 } = product;

// console.log(productLabel); // renamed the variable
// console.log(stock);
// console.log(rating); // undefined -- does not exist in product

const transaction = (type, { label, stock }) => {
    // const {label} = myProduct; // You can do this in the param of the function
    console.log(type, label, stock);
};

transaction('order', product);
