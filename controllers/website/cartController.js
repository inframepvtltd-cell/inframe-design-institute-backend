import Razorpay from 'razorpay'
import { onlineCourseModel } from '../../models/onlineCourseModel.js'
import { offlineCourseModel } from '../../models/offlineCourseModel.js'
import { userModel } from '../../models/userModel.js'
import { cartModel } from '../../models/cartModel.js'

// Add item to cart
export const addToCart = async (req, res) => {
  const { id, itemId, main } = req.body

  try {
    let courseData = await onlineCourseModel
      .findOne({ _id: itemId })
      .select('courseName coursePrice courseCategory courseHeadline courseImage')
      .populate('courseCategory')

    if (!courseData) {
      courseData = await offlineCourseModel
        .findOne({ _id: itemId })
        .select('courseName coursePrice courseCategory courseHeadline courseImage')
        .populate('courseCategory')
    }

    const cartObj = {
      userId: id,
      userData: await userModel.findOne({ _id: id }),
      courseDetails: courseData,
      quantity: 1,
      main
    }

    const cart = new cartModel(cartObj)
    const cartRes = await cart.save()

    res.send({
      status: 1,
      msg: 'Added in cart successfully!',
      cartRes
    })
  } catch (err) {
    res.send({
      status: 0,
      msg: 'Add to cart API failed',
      err
    })
  }
}

// View cart entries
export const cartEntryView = async (req, res) => {
  const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
  const { id } = req.body

  try {
    const cartData = await cartModel.find({ userId: id })
    res.send({
      status: 1,
      msg: 'All cart entries',
      cartData,
      staticPath
    })
  } catch (err) {
    res.send({
      status: 0,
      msg: 'Failed to fetch cart data',
      err
    })
  }
}

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { id, courseId } = req.body

  try {
    const removeCart = await cartModel.deleteOne({ userId: id, _id: courseId })
    res.send({
      status: 1,
      msg: 'Course removed from cart',
      removeCart
    })
  } catch (err) {
    res.send({
      status: 0,
      msg: 'Something went wrong',
      err
    })
  }
}
