import { catchError } from "../../middlewares/catchError.js";
import AppError from "../../utils/AppError.js";
import { cartModel } from "../../../databases/models/cart.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
const calcAfterDiscountOnCall=(cart)=>{
    if(cart.discount){
        cart.totalPriceAfterDiscount = cart.totalPrice-(cart.totalPrice *(cart.discount/100));
    }
}
const addToCart = catchError(async (req, res, next) => {
  req.body.quantity = req.body.quantity || 1;
  // Check if cart exist for this user
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  // Check if product exist
  let product = await productModel.findById(req.body.product);
  if (!product) return next(new AppError("Product not found", 404));
  // If cart exist
  if (isCartExist) {
    // Check if product exist in cart
    let isProductExist = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    // Incase the product exist in cart
    if (isProductExist) {
      // Check if the quantity of the product in the cart is more than the quantity Available in the product
      if (product.quantity < isProductExist.quantity + req.body.quantity)
        return next(new AppError("Product quantity not enough", 400));
      // Increase the quantity of the product by the quantity in the request
      isProductExist.quantity += req.body.quantity;
      // Increase the price of the product by the price of the product * the quantity in the request
      isProductExist.price = product.price * isProductExist.quantity;
    }
    // Incase the product not exist in cart
    else {
      // Add the product to the cart
      isCartExist.cartItems.push({
        product: req.body.product,
        quantity: req.body.quantity,
        price: product.price * req.body.quantity,
      });
    }
    // Check if the quantity of the product in the cart is more than the quantity Available in the product
    if (req.body.quantity > product.quantity)
      return next(new AppError("Product quantity not enough", 400));
    // Calculate the total price of the cart
    isCartExist.totalPrice = isCartExist.cartItems.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    // Calculate the total price after discount
    isCartExist.totalPriceAfterDiscount =
      isCartExist.totalPrice - isCartExist.discount;
    await isCartExist.save();
    res.json({ message: "success", isCartExist });
  } else {
    // Incase the cart not exist
    // Create new cart for the user
    let newCart = new cartModel({
      user: req.user._id,
      cartItems: [
        {
          product: req.body.product,
          quantity: req.body.quantity,
          price: product.price * req.body.quantity,
        },
      ],
      // Calculate the total price of the cart with discount=0
      totalPrice: product.price * req.body.quantity,
      totalPriceAfterDiscount: product.price * req.body.quantity - 0,
      discount: 0,
    });
    await newCart.save();
    res.json({ message: "success", newCart });
  }
});

const removeFromCart = catchError(async (req, res, next) => {
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) return next(new AppError("Cart not found", 404));

  let isProductExist = isCartExist.cartItems.find(
    (item) => item.product == req.params.id
  );
  if (!isProductExist)
    return next(new AppError("Product not found in cart", 404));

  isCartExist.cartItems = isCartExist.cartItems.filter(
    (item) => item.product != req.params.id
  ); // Remove the product from the cart with reassigned the cartItems array
  isCartExist.totalPrice = isCartExist.cartItems.reduce(
    (acc, curr) => acc + curr.price,
    0
  ); // Calculate the total price of the cart
  isCartExist.totalPriceAfterDiscount =
    isCartExist.totalPrice - isCartExist.discount; // Calculate the total price after discount
  await isCartExist.save();
  res.json({ message: "success", isCartExist });
});
const getLoggedUserCartes = catchError(async (req, res) => {
  let cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  !cart && res.json({ message: "Cart not found" });
  cart && res.json({ message: "success", cart });
});
// change the quantity of the product in the cart
const updateQuantity = catchError(async (req, res, next) => {
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) return next(new AppError("Cart not found", 404));

  let isProductExist = isCartExist.cartItems.find(
    (item) => item.product == req.params.id
  );
  if (!isProductExist)
    return next(new AppError("Product not found in cart", 404));

  let product = await productModel.findById(req.params.id);
  if (!product) return next(new AppError("Product not found", 404));

  if (req.body.quantity > product.quantity)
    return next(new AppError("Product quantity not enough", 400));

  isProductExist.quantity = req.body.quantity;
  isProductExist.price = product.price * req.body.quantity;
  isCartExist.totalPrice = isCartExist.cartItems.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  isCartExist.totalPriceAfterDiscount =
    isCartExist.totalPrice - isCartExist.discount;
    calcAfterDiscountOnCall(isCartExist);
  await isCartExist.save();
  res.json({ message: "success", isCartExist });
});
const clearUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndDelete({ user: req.user._id });
  return !cart
    ? next(new AppError("Cart not found", 404))
    : res.json({ message: "success", cart });
});
const applyCoupon = catchError(async (req, res, next) => {
    // check the existence of the coupon
    let coupon = await couponModel.findOne({code:req.body.coupon,expires:{$gt:Date.now()}});
    if(!coupon) return next(new AppError("Coupon not found",404));
    // check the existence of the cart
    let cart = await cartModel.findOne({user:req.user._id});
    if(!cart) return next(new AppError("Cart not found",404));
    // check if the coupon is already applied
    if(cart.coupon) return next(new AppError("Coupon already applied",400));
    // apply the coupon to the cart
    calcAfterDiscountOnCall(cart);
    await cart.save();
    res.json({message:"success",cart});
});

export default {
  addToCart,
  removeFromCart,
  updateQuantity,
  getLoggedUserCartes,
  clearUserCart,
  applyCoupon
};
