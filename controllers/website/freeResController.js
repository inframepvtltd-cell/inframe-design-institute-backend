import { freeResCategoryModel } from "../../models/freeResCategoryModel.js"
import { freeResModel } from "../../models/freeResModel.js"

export const viewAllFreeRes = async (req, res) => {
    try {
        const result = await freeResModel.find()
        if (!result) return res.send({ status: -1, msg: 'free resources not found' })
        res.send({
            status: 1,
            msg: 'free res all data',
            result
        })
    } catch (error) {
        return res.send({ status: -1, msg: 'Something went wrong', error })
    }
}

export const viewAllCategories = async (req, res) => {
    try {
        const result = await freeResCategoryModel.find()
        if (!result) return res.send({ status: -1, msg: 'category not found' })
        res.send({
            status: 1,
            msg: 'free res all categories',
            result
        })
    } catch (error) {
        console.log(error)
    }
}

export const viewCategoryData = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.send({ status: -1, msg: 'Id is required' })
        const result = await freeResModel.find({ resCategory: id })
        if (!result) return ({ status: -2, msg: "Can't found category data" })
        res.send({
            status: 1,
            msg: 'all category wise data',
            result
        })
    }
    catch (error) {
        return res.send({
            status: -5,
            msg: 'Something went wrong',
            error
        })
    }
}