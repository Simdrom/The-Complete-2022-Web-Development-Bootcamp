// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err))
  .finally(console.log(`Mongoose connection did`));



async function main() {
  const database = 'fruitsDB'
  await mongoose.connect('mongodb://localhost:27017/' + database);
}

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, check the name of your Fruit, no name specified!"],
    unique: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Pretty solid as a fruit."
// });

// fruit.save();

// console.log("Fruit saved");

// From here, name age for ppl. John 37.

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: {
    type: fruitSchema,
    required: true
  }
});

const People = mongoose.model('People', peopleSchema);

// const person = new People({
//   name: "John",
//   age: 37
// });

// person.save();

// console.log(person.name + ' created');


const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Best one."
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Too sour for me."
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture."
});


const mango = new Fruit({
  name: "Mango",
  rating: 354,
  review: "Weird."
});

const watermelon = new Fruit({
  name: "Watermelon",
  rating: 10,
  review: "Splendid."
});

// Fruit.find({ name: watermelon.name }, function (fruit) {
//   if (fruit === null) {
    // Fruit.insertMany(watermelon, function (err) {
    //   if (err) console.error(err.message)
    //   else console.log(`Saved ${watermelon.name}`);
    // });
  // }
// })
// if (Fruit.find({name:"Mango"}).size === 0) Fruit.insertMany(mango);
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if(err) throw err
//   else console.log(`Saved all fruits`);
// });


// Fruit.find(function (err, fruits) {
//   if (err) throw err
//   else {
//     mongoose.connection.close().then(function (test) {
//       console.log("Closed connection")
//     });

//     console.log(fruits);

//     fruits.forEach(fruit => {
//       console.log(fruit.name)

//     });
//   }
// })

// Fruit.find({name:"Orange"},function (err, fruits) {
//   if(err) throw err
//   else console.log(fruits);
// })

const fwef = new Fruit({
  name: "fwef",
  rating: 10,
  review: "Splendid."
});

fwef.save()

const person = new People({
  name: "Amy",
  age: 23,
  favouriteFruit: fwef
});


person.save();