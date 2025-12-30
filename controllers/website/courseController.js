import { offlineCategoryModel } from '../../models/offlineCategoryMode.js'
import { offlineCourseModel } from '../../models/offlineCourseModel.js'
import { onlineCategoryModel } from '../../models/onlineCategoryModel.js'
import { onlineCourseModel } from '../../models/onlineCourseModel.js'

// View all online courses
export const onlineCourseView = async (req, res) => {
    try {
        const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
        const onlineCourseData = await onlineCourseModel
            .find()
            .populate('courseCategory', 'categoryName') // populate courseCategory field, only categoryName

        res.send({
            status: 1,
            msg: 'Online course data',
            onlineCourseData,
            staticPath
        })
    } catch (err) {
        res.send({
            status: 0,
            msg: 'Something went wrong',
            err
        })
    }
}

// View all offline courses
export const offlineCourseView = async (req, res) => {
    try {
        const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
        const offlineCourseData = await offlineCourseModel
            .find()
            .populate('courseCategory', 'categoryName') // populate courseCategory field, only categoryName

        res.send({
            status: 1,
            msg: 'Offline course data',
            offlineCourseData,
            staticPath
        })
    } catch (err) {
        res.send({
            status: 0,
            msg: 'Something went wrong',
            err
        })
    }
}

// Fetch all online categories
export const fetchOnlineCategory = async (req, res) => {
    try {
        const categoryData = await onlineCategoryModel.find()
        res.send({
            status: 1,
            msg: 'Category data',
            categoryData
        })
    } catch (err) {
        res.send({
            status: 0,
            msg: 'Something went wrong',
            err
        })
    }
}

// Fetch all offline categories
export const fetchOfflineCategory = async (req, res) => {
    try {
        const categoryData = await offlineCategoryModel.find()
        res.send({
            status: 1,
            msg: 'Category data',
            categoryData
        })
    } catch (err) {
        res.send({
            status: 0,
            msg: 'Something went wrong',
            err
        })
    }
}
