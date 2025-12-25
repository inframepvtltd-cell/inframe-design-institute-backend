const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { onlineCourseModel } = require("../../models/onlineCourseModel")

const onlineCourseView = async (req, res) => {
    try {
        const staticPath = process.env.APIBASEURL + "/uploads/coursesImages/"
        const onlineCourseData = await onlineCourseModel
            .find()
            .populate("courseCategory", "categoryName");  // courseCategory field ko populate karega, sirf categoryName laayega

        res.send({
            status: 1,
            msg: "online course data",
            onlineCourseData,
            staticPath
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};


const offlineCourseView = async (req, res) => {
    try {


        const staticPath = process.env.APIBASEURL + "/uploads/coursesImages/"
        const offlineCourseData = await offlineCourseModel
            .find()
            .populate("courseCategory", "categoryName");  // courseCategory field ko populate karega, sirf categoryName laayega
        res.send({
            status: 1,
            msg: "offline course data",
            offlineCourseData,
            staticPath
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "kuch galat ho gaya",
            err,
        });
    }
};







const fetchOnlineCategory = async (req, res) => {
    try {
        const categoryData = await onlineCategoryModel.find();
        res.send({
            status: 1,
            msg: "category data",
            categoryData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};



const fetchOfflineCategory = async (req, res) => {
    try {
        const categoryData = await offlineCategoryModel.find();
        res.send({
            status: 1,
            msg: "category data",
            categoryData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};



module.exports = { onlineCourseView, offlineCourseView, fetchOnlineCategory, fetchOfflineCategory }