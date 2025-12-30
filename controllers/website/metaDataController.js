import { offlineCourseModel } from "../../models/offlineCourseModel.js";
import { onlineCourseModel } from "../../models/onlineCourseModel.js";

const metaDataFetchOnline = async (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    try {
        const courseData = await onlineCourseModel.findOne({ courseName: slug });
        console.log(courseData);
        res.send({
            status: 1,
            msg: 'course fetched for meta data',
            courseData
        });
    } catch (error) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            error
        });
    }
};

const metaDataFetchOffline = async (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    try {
        const courseData = await offlineCourseModel.findOne({ courseName: slug });
        console.log(courseData);
        res.send({
            status: 1,
            msg: 'course fetched for meta data',
            courseData
        });
    } catch (error) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            error
        });
    }
};

export { metaDataFetchOnline, metaDataFetchOffline };
