const mongoose = require('mongoose');

const connDB = () => {
    console.log("trying to connect with DB");
    mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log("MongoDb connected succesfully!"))
        .catch(err => console.log("mongoDB Not Connected! \nERROR: " + err))
}

module.exports = connDB;

