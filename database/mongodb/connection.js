const mongoose = require("mongoose");

async function connect()
{
    try {
        await mongoose.connect("mongodb+srv://root:root@notes.gyvb6.mongodb.net/notes?retryWrites=true&w=majority",
            { useNewUrlParser: true },
        )
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect };