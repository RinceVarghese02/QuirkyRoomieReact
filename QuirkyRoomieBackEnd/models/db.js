const mongoose = require('mongoose')

const database = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/flatmatedata')
        .then(() => { console.log('database created') })
        .catch((err) => { console.log(err) })
}

module.exports = database;
