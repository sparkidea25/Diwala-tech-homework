const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    Time: {
        type: Date,
        default: Date.now
    },
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true,
    }
});

export default mongoose.model('Order', OrderSchema);