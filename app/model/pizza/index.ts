const mongoose = require('mongooseq');

const Pizza = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    }
})

export default mongoose.model('Pizza', Pizza);