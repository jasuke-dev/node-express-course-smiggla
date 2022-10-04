const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripeController = async(req,res)=>{
  const {purchase,total_amount,shipping_fee} = req.body

  //di real case diharuskan mengecaek harga di database
  const calculateOrderAmount = ()=>{
    return total_amount + shipping_fee
  }

  const paymenIntent= await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })

  console.log(paymenIntent)
  res.json({clientSecret:paymenIntent.client_secret})

}

module.exports = stripeController