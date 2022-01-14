const mongoose = require("mongoose");

const DB = "mongodb://localhost/mernstack"
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then((con) => {
    console.log('connection successful');
}).catch((err) => {
    console.log("the error is "+err);
});

