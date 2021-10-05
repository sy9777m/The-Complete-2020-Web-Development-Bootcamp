const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Pretty solid as a fruit'
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favorFruitSchema: fruitSchema
});

const pineapple = new Fruit({
    name: 'Pineapple',
    rating: 9,
    review: 'Great fruit'
});

pineapple.save();

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: 'John',
    age: 32,
    favorFruitSchema: pineapple
});

person.save();

const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 9,
    review: 'The best fruit!'
});

const orange = new Fruit({
    name: 'Orange',
    rating: 9,
    review: 'The best fruit!'
});

const banana = new Fruit({
    name: 'Banana',
    rating: 9,
    review: 'The best fruit!'
});

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('successfully added into FruitDB');
//     }
// })

Fruit.updateOne({
    _id: '5edb41b28408362738f59451'
}, {
    name: 'Peach'
}, function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log('successfully updated');
    }
});

// Fruit.deleteOne({
//     _id: '5edb41b28408362738f59451'
// }, function (err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('successfully deleted');
//     }
// });

Fruit.deleteMany({
    name: 'Apple'
}, function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log('successfully deleted many');
    }
})

Fruit.find(function (err, fruits) {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close();
    }
});