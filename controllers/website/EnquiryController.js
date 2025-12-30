import { cityModel } from '../../models/cityModel.js'
import { enquiryModel } from '../../models/enquiryModel.js'
import { stateModel } from '../../models/stateModel.js'
import { bookSessionModel} from '../../models/bookasessionModel.js'
// Add new enquiry
export const enquiryAdd = async (req, res) => {
  try {
    const {
      enquiryName,
      enquiryEmail,
      enquiryPhone,
      enquiryState,
      enquiryCity,
      enquiryProgram,
      enquiryCourse
    } = req.body

    const stateData = await stateModel.findById(enquiryState)

    const dataObj = {
      enquiryName,
      enquiryEmail,
      enquiryPhone,
      enquiryState: stateData.stateName,
      enquiryCity,
      enquiryProgram,
      enquiryCourse,
      enquiryIsMarked: false
    }

    const enquiry = new enquiryModel(dataObj)
    const enquiryRes = await enquiry.save()

    // // ✅ Send SMS to admin after saving enquiry
    // const adminNumber = '+918079092775';
    // const smsText = `New Enquiry Received:\nName: ${enquiryName}\nPhone: ${enquiryPhone}\nEmail: ${enquiryEmail}\nProgram: ${enquiryProgram}\nCourse: ${enquiryCourse}\nState: ${stateData.stateName}\nCity: ${enquiryCity}`;
    // await sendSMS(adminNumber, smsText);

    res.send({
      status: 1,
      msg: 'Enquiry submitted and SMS sent',
      enquiryRes
    })
  } catch (error) {
    console.error('Enquiry Error:', error)
    res.send({
      status: 0,
      msg: 'Something went wrong',
      error
    })
  }
}

// View all cities
export const enquiryCityView = async (req, res) => {
  const cityRes = await cityModel.find().populate('state')
  res.send({
    status: 1,
    msg: 'City data',
    cityRes
  })
}

// Book a session
export const bookSession = async (req, res) => {
  try {
    const { userName, userEmail, userPhone, examType } = req.body

    if (!userName || !userEmail || !userPhone || !examType)
      return res.send({ status: -1, msg: 'All fields required' })

    const result = new bookSessionModel(req.body)
    const finalResult = await result.save()

    res.send({ status: 1, msg: 'Session successfully booked!', finalResult })
  } catch (error) {
    res.send({
      status: -5,
      msg: 'Something went wrong',
      error
    })
  }
}

// Remove a booked session
export const removedFromBookedSessions = async (req, res) => {
  try {
    const { id } = req.params
    const deleteUser = await bookSessionModel.findOneAndDelete({ _id: id })

    if (deleteUser) {
      res.send({
        status: 1,
        msg: 'User removed successfully',
        deleteUser
      })
    } else {
      res.send({
        status: -1,
        msg: 'Something went wrong while deleting'
      })
    }
  } catch (error) {
    res.send({
      status: -5,
      msg: 'Something went wrong',
      error
    })
  }
}

// View all states
export const enquiryStateView = async (req, res) => {
  const enquiryStateData = await stateModel.find()
  res.send({
    status: 1,
    msg: 'Enquiry state data',
    enquiryStateData
  })
}
