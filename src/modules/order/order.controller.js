import { catchError } from "../../middlewares/catchError.js";
import AppError from "../../utils/AppError.js";
import { cartModel } from "../../../databases/models/cart.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import {orderModel} from "../../../databases/models/order.model.js";
import {userModel} from "../../../databases/models/user.model.js";
import { sendEmail } from "../../services/emails/sendEmail.js";
import jwt from "jsonwebtoken"; 
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51Q3FuBRsrwmfX15h12KPyTIJQUiQFHJlapXkfzhV9COOHkrGywFH9DLgn9riPjeEvPhFu16m4PTP7RFIWsQaJ9Hf00iqLuFy7E");
// OrderSchema:
/* 
  ["user","orderItems","totalOrderPrice","shippingAddress",
  "paymentType","isDelivered","deliveredAt","isPaid","paidAt"]
*/
const createCashOrder = catchError(async (req, res, next) => {
  //ToDo:
  // 1- Check if the user has a cart
  // 2- Create a new order with total order price from the cart items
  // 3- increment the product sold field in the product collection, and decrement the quantity field
  // 4- Empty the cart
  // 5- Send the order details to the user

  let cart=await cartModel.findOne({user:req.user._id});
  if(!cart) return next(new AppError("Cart not found", 404));

  let order=new orderModel({
    user:req.user._id,
    orderItems:cart.cartItems,
    totalOrderPrice:cart.totalPriceAfterDiscount,
    shippingAddress:req.body.shippingAddress,
    paymentType:'cash'
  });
  order=await order.save();
  let options=cart.cartItems.map(item=>{
    return {
      updateOne:{
        filter:{_id:item.product},
        update:{$inc:{sold:item.quantity,quantity:-1*item.quantity}}
      }
    }
  })// options return array of operations to be done on the products

  await productModel.bulkWrite(options)
  /** BulkWriteResult=>
   * "changes": {
        "insertedCount": 0,
        "matchedCount": 2,
        "modifiedCount": 2,
        "deletedCount": 0,
        "upsertedCount": 0,
        "upsertedIds": {},
        "insertedIds": {}
    }
  */
  await cartModel.findOneAndDelete({ user: req.user._id });
  
  res.status(201).json({ status: "success", order });
});
const sendOrderEmail=catchError(async (req,res,next)=>{
  let order=await orderModel.findOne({user:req.user._id})
  order.orderItems.forEach(async item => {
    item.title = await productModel.findById(item.product).title;
  });
  sendEmail(req.user.email,order)
  res.status(200).json({status:"success"})
})
const getUserOrder = catchError(async (req, res, next) => {
  let order=await orderModel.findOne({ user: jwt.verify(req.query.token, process.env.JWT_SECRET_KEY).userId });
  order && res.status(200).json(order);
})
const getAllOrders=catchError(async (req,res,next)=>{
  let orders=await orderModel.find();
  res.status(200).json(orders)
});
const createCheckOutSession=catchError(async(req,res,next)=>{
  let cart=await cartModel.findOne({user:req.user._id});
  if(!cart) return next(new AppError("Cart not found", 404));

  let session=await stripe.checkout.sessions.create({
    line_items:[{
      price_data:{
        currency:'egp',
        unit_amount:cart.totalPriceAfterDiscount*100,
        product_data:{
          name:req.user.name
          // image:cart.cartItems[0].image,
          
        },
        
      },
      quantity:1
    }],
    mode:'payment',// payment--> one time payment or setup --> Save Payment Detail to charge the customer later or subscription-->monthly payment for example
    success_url:"https://route-comm.netlify.app/#/",// redirect to this url after successful payment in front end.
    cancel_url:"https://route-comm.netlify.app/#/cart",// redirect to this url after cancel payment in front end.
    customer_email:req.user.email,
    client_reference_id:cart._id.toString(),
    metadata:{
      shippingAddress:req.body.shippingAddress.toString(),
      userId:req.user._id.toString()
    }
  })
  res.status(200).json({status:"success",session})
})

const createOnlineOrder=catchError(async (req, res,next) => {
    let endpointSecret = 'whsec_zPfbrjM3IIgu7I9ckBDAV1SuPSi2CJtq';
    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'].toString();
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
    }
    
      if(event.type==="checkout.session.completed"){
        console.log("Order Completed")
          card(event.data.object);

          console.log("Order Completed",event.toString())
          res.status(200).json({received: true, order,event});
          }
          else{
            console.log(`Unhandled event type ${event.type}.`);
            res.sendStatus(403);
          }
    // Return a 200 res to acknowledge receipt of the event
  });
const card= async(e)=>{
          let cart=await cartModel.findById(e.client_reference_id);
          if(!cart) return next(new AppError("Cart not found", 404));
          let user=await userModel.findOne({email:e.customer_email});
          let order=new orderModel({
            user:user._id,
            orderItems:cart.cartItems,
            totalOrderPrice:e.amount_total/100,
            shippingAddress:e.metadata.shippingAddress,
            paymentType:'card',
            isPaid:true,
            paidAt:Date.now(),
          });
          order=await order.save();
          let options=cart.cartItems.map(item=>{
            return {
              updateOne:{
                filter:{_id:item.product},
                update:{$inc:{sold:item.quantity,quantity:-1*item.quantity}}
              }
            }
          })// options return array of operations to be done on the products
          await productModel.bulkWrite(options)
          await cartModel.findOneAndDelete({user:user._id}); 
          
}
export default { createCashOrder,getUserOrder,getAllOrders,createCheckOutSession,createOnlineOrder}; 