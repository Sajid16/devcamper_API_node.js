const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');
const { deleteMany } = require('./models/Bootcamp');

// connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// read json files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

// import data into database
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
    } catch (error) {
        console.error(error);
    }
}

// delete data from database
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Removed...'.red.inverse);
    } catch (error) {
        console.error(error);
    }
}

// import or delete according to command
if(process.argv[2] == '-i'){
    importData();
} else if(process.argv[2] == '-d'){
    deleteData();
}
