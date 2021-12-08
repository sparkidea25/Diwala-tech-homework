const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    Time: {
        type: Date,
        default: Date.now
    },
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        autopopulate: true,
        required: true,
    },
    amount: {
        type: Number
    }
});

export default mongoose.model('Order', OrderSchema);