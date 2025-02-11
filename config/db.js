const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectToDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MONGODB connected');
    } catch(err) {
        console.log(err.message);
        // exist process with failture
        process.exit(1);
    }
}

module.exports = connectToDB;