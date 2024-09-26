import mongoose from "mongoose";
const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalOrderPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash',
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    }
}, {
    timestamps: true,toJSON:{virtuals:true},strict:true
});
schema.virtual('Product',{
    ref:'Product',// the collection which we want to join
    foreignField:'_id',// the field which is joining the two collections
    localField:'orderItems.product', // the field which is in the same collection
    // justOne:false // if we want to get one review or multiple reviews
})
schema.pre('findOne',function(){
    this.populate('Product');
    console.log(this)
})
schema.pre('findAndUpdate', function () {
    this.totalPrice = this.cartItems.reduce((acc, curr) => acc + curr.price, 0);
    this.totalPriceAfterDiscount = this.totalPrice - this.discount;
})
export const orderModel = mongoose.model("Order", schema);