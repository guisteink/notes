const mongoose = require("mongoose");

async function connect()
{
    try {
        await mongoose.connect(
            //!todo
            //   "mongodb://SuperTestUser:SuperTestUser1@ds211648.mlab.com:11648/todo-tdd",
            "mongodb+srv://root:root@notes.gyvb6.mongodb.net/notes?retryWrites=true&w=majority",
            { useNewUrlParser: true },
        );
        console.error("Connected to mongodb 🔥");
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect };