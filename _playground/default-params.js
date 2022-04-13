const greeter = (name = 'user') => {
    console.log('Hello ' + name);
};

greeter('Joseph');
greeter();

// Default values w/ objects
const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
};

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
};

transaction('order');
transaction('order', product);
