const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dburl = "mongodb+srv://onlinesalahin:quzZzMFXqhJLh7Yb@cluster0.ymm6wzj.mongodb.net/reactdb?retryWrites=true&w=majority";

const connection = ()=>{
    mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('Database Connected'))
    .catch(e=>console.log(e));

}

module.exports=connection;
