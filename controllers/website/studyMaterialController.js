import { studyMaterialCategoryModel } from "../../models/studyMaterialCategoryModel.js";
import { studyMaterialModel } from "../../models/studyMaterialModel.js";

export const viewStudyMaterialCategories = async (req, res) => {
    try {
        const result = await studyMaterialCategoryModel.find().sort({ createdAt: -1 });

        if (!result || result.length === 0) {
            return res.send({
                status: -1,
                msg: "No study material categories found",
                result: [],
            });
        }

        return res.send({
            status: 1,
            msg: "Study material categories fetched successfully",
            result,
        });
    } catch (error) {
        console.error(error);
        return res.send({
            status: -5,
            msg: "Something went wrong",
            error: error.message,
        });
    }
};


export const viewStudyMaterials = async (req, res) => {
    try {
        const result = await studyMaterialModel.find().populate('materialCategory')
        res.send({
            status: 1,
            msg: 'study materaials data',
            result
        })
    } catch (error) {
        console.error(error);
        return res.send({
            status: -5,
            msg: "Something went wrong",
            error: error.message,
        });
    }
}


export const viewMetaDataStudyMaterials = async (req, res) => {
    try {
        const { slug } = req.params
        const result = await studyMaterialModel.findOne({ materialSlug: slug }).select(['metaTitle', 'metaDescription'])
        if (!result) return res.send({ status: -1, msg: 'cannot found study material meta data' })
        return res.send({
            status: 1,
            msg: 'study material meta data',
            result
        })
    } catch (error) {
        console.log(error)
    }
}