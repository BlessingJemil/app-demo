const express = require('express')
const cors=require('cors');
//Initialize express app
const app = express();
const mongoose = require('mongoose');

const Address = require('./User');
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Initialize the sever
app.listen(5000, () => {
    console.log('sever listening on port:5000');
});

// Connecting to DB
mongoose.connect('mongodb+srv://blessingjemil:lY8uxy3W0h271woB@cluster0.klusmyu.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to db')
}).catch((error) => {
 console.log(error)
})

// Adding a User to AddressBook
{/*app.post('/', (req, res) => {
    console.log(req.body);
    firstname = req.body.name,
    email = req.body.email,
    phone = req.body.phone,
    place = req.body.place
   let newAddress = new Address({
     name: firstname,
     email: email,
     phone: phone,
     place: place
    })
   newAddress.save().then((address) => {
     res.send(address)
    }).catch((err) => {
     console.log(err)
    })
   })*/}

 

// Connect to MongoDB

 
{/*const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/}

const User = mongoose.model('User', {

  name: String,

  email: String,

  phone: Number,

  place: String

});

// Create a new user

app.post('/addusers', async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.status(201).json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

});

 

// Get all users

app.get('/users', async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

});

 

// Get a specific user by ID

app.get('/listusers/:id', async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({ error: 'User not found' });

    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

});

 

// Update a user by ID

app.put('/updateusers/:id', async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!user) {

      return res.status(404).json({ error: 'User not found' });

    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

});

 

// Delete a user by ID

app.delete('/deleteusers/:id', async (req, res) => {

  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {

      return res.status(404).json({ error: 'User not found' });

    }

    res.json({ message: 'User deleted successfully' });

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

});