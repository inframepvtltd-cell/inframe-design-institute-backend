import sendSMS from '../../configs/twilioConfig.js';
import { bookSessionModel } from '../../models/bookasessionModel.js';
import { cityModel } from '../../models/CityModel.js';
import { enquiryModel } from '../../models/EnquiryModel.js';
import { stateModel } from '../../models/StateModel.js';

const enquiryAdd = async (req, res) => {
  try {
    const {
      enquiryName,
      enquiryEmail,
      enquiryPhone,
      enquiryState,
      enquiryCity,
      enquiryProgram,
      enquiryCourse,
    } = req.body;

    const stateData = await stateModel.findById(enquiryState);

    const dataObj = {
      enquiryName,
      enquiryEmail,
      enquiryPhone,
      enquiryState: stateData?.stateName,
      enquiryCity,
      enquiryProgram,
      enquiryCourse,
      enquiryIsMarked: false,
    };

    const enquiry = new enquiryModel(dataObj);
    const enquiryRes = await enquiry.save();

    // Optional SMS logic (keep commented if not needed)
    // const adminNumber = '+918079092775';
    // const smsText = `New Enquiry Received:
    // Name: ${enquiryName}
    // Phone: ${enquiryPhone}
    // Email: ${enquiryEmail}`;
    // await sendSMS(adminNumber, smsText);

    res.send({
      status: 1,
      msg: 'Enquiry submitted successfully',
      enquiryRes,
    });
  } catch (error) {
    console.error('Enquiry Error:', error);
    res.send({
      status: 0,
      msg: 'Something went wrong',
    });
  }
};

const enquiryCityView = async (req, res) => {
  const cityRes = await cityModel.find().populate('state');
  res.send({
    status: 1,
    msg: 'City data',
    cityRes,
  });
};

const bookSession = async (req, res) => {
  try {
    const { userName, userEmail, userPhone, examType } = req.body;

    if (!userName || !userEmail || !userPhone || !examType) {
      return res.send({ status: -1, msg: 'all fields required' });
    }

    const result = new bookSessionModel(req.body);
    const finalResult = await result.save();

    res.send({
      status: 1,
      msg: 'session successfully booked!',
      finalResult,
    });
  } catch (error) {
    res.send({
      status: -5,
      msg: 'something went wrong',
    });
  }
};

const removedFromBookedSessions = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await bookSessionModel.findOneAndDelete({ _id: id });

    if (deleteUser) {
      res.send({
        status: 1,
        msg: 'user removed successfully',
        deleteUser,
      });
    } else {
      res.send({
        status: -1,
        msg: 'something went wrong to delete',
      });
    }
  } catch (error) {
    res.send({
      status: -5,
      msg: 'something went wrong',
    });
  }
};

const enquiryStateView = async (req, res) => {
  const enquiryStateData = await stateModel.find();
  res.send({
    status: 1,
    msg: 'enquiry state data',
    enquiryStateData,
  });
};

export {
  enquiryAdd,
  enquiryCityView,
  enquiryStateView,
  bookSession,
  removedFromBookedSessions,
};
