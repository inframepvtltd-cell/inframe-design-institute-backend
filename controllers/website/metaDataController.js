import { offlineCourseModel } from '../../models/offlineCourseModel.js'
import { onlineCourseModel } from '../../models/onlineCourseModel.js'

export const metaDataFetchOnline = async (req, res) => {
  const { slug } = req.params
  console.log(slug)
  try {
    const courseData = await onlineCourseModel.findOne({ courseName: slug })
    console.log(courseData)
    res.send({
      status: 1,
      msg: 'Course fetched for meta data',
      courseData
    })
  } catch (error) {
    res.send({
      status: 0,
      msg: 'Something went wrong',
      error
    })
  }
}

export const metaDataFetchOffline = async (req, res) => {
  const { slug } = req.params
  console.log(slug)
  try {
    const courseData = await offlineCourseModel.findOne({ courseName: slug })
    console.log(courseData)
    res.send({
      status: 1,
      msg: 'Course fetched for meta data',
      courseData
    })
  } catch (error) {
    res.send({
      status: 0,
      msg: 'Something went wrong',
      error
    })
  }
}
