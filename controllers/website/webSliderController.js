import { sliderModel } from '../../models/sliderModel.js'

export const webSlider = async (req, res) => {
  try {
    const SliderData = await sliderModel.find()
    res.send({
      status: 1,
      msg: 'slider data',
      SliderData
    })
  } catch (error) {
    res.send({
      status: 0,
      msg: 'failed to fetch slider data',
      error
    })
  }
}
