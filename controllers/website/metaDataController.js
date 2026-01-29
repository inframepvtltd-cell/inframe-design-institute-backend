import { offlineCourseModel } from "../../models/offlineCourseModel.js";
import { onlineCourseModel } from "../../models/onlineCourseModel.js";
import { studyMaterialModel } from "../../models/studyMaterialModel.js";

const metaDataFetchOnline = async (req, res) => {
    const { slug } = req.params;
    try {
        const courseData = await onlineCourseModel.findOne({ courseName: slug });
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
    try {
        const courseData = await offlineCourseModel.findOne({ courseName: slug });
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


const metaDataFetchStudyMaterial = async (req, res) => {
    const { slug } = req.params;
    try {
        const materialData = await studyMaterialModel.findOne({ materialSlug: slug });
        res.send({
            status: 1,
            msg: 'material fetched for meta data',
            materialData
        });

    } catch (error) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            error
        });
    }
}

export { metaDataFetchOnline, metaDataFetchOffline, metaDataFetchStudyMaterial };
