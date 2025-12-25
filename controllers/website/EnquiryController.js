const sendSMS = require("../../configs/twilioConfig");
const { bookSessionModel } = require("../../models/bookasessionModel");
const { cityModel } = require("../../models/CityModel");
const { enquiryModel } = require("../../models/EnquiryModel");
const { stateModel } = require("../../models/StateModel");

// Twilio SMS utility

const enquiryAdd = async (req, res) => {
    console.log(process.env.TWILIO_ACCOUNT_SID);
    console.log(process.env.TWILIO_AUTH_TOKEN);
    console.log(process.env.TWILIO_PHONE_NUMBER);

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
            enquiryState: stateData.stateName,
            enquiryCity,
            enquiryProgram,
            enquiryCourse,
            enquiryIsMarked: false,
        };

        const enquiry = new enquiryModel(dataObj);
        const enquiryRes = await enquiry.save();

        // // ✅ Send SMS to admin after saving enquiry
        // const adminNumber = '+918079092775'; // Replace with actual admin number
        // const smsText = `New Enquiry Received:\nName: ${enquiryName}\nPhone: ${enquiryPhone}\nEmail: ${enquiryEmail}\nProgram: ${enquiryProgram}\nCourse: ${enquiryCourse}\nState: ${stateData.stateName}\nCity: ${enquiryCity}`;

        // await sendSMS(adminNumber, smsText);

        res.send({
            status: 1,
            msg: "Enquiry submitted and SMS sent",
            enquiryRes,
        });
    } catch (error) {
        console.error("Enquiry Error:", error);
        res.send({
            status: 0,
            msg: "Something went wrong",
            error,
        });
    }
};

const enquiryCityView = async (req, res) => {
    const cityRes = await cityModel.find().populate("state");
    res.send({
        status: 1,
        msg: "City data",
        cityRes,
    });
};

const bookSession = async (req, res) => {
    try {
        const { userName, userEmail, userPhone, examType } = req.body;

        if (!userName || !userEmail || !userPhone || !examType)
            return res.send({ status: -1, msg: "all fields required" });

        const result = await bookSessionModel(req.body)
        const finalResult = await result.save()

        if (result) return res.send({ status: 1, msg: 'session successfully booked !', finalResult })
    } catch (error) {
        res.send({
            status: -5,
            msg: "something went wrong",
        });
    }
};



const removedFromBookedSessions = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await bookSessionModel.findOneAndDelete({ _id: id })
        if (deleteUser) {
            res.send({
                status: 1,
                msg: 'user removed successfully',
                deleteUser
            })
        }
        else {
            res.send({
                status: -1,
                msg: 'something went wrong to delete'
            })
        }
    }
    catch (error) {
        res.send({
            status: -5,
            msg: "something went wrong",
        });
    }
}


const enquiryStateView = async (req, res) => {
    const enquiryStateData = await stateModel.find()
    res.send({
        status: 1,
        msg: 'enquiry state data',
        enquiryStateData
    })
}

module.exports = { enquiryAdd, enquiryCityView, bookSession, removedFromBookedSessions,enquiryStateView };
