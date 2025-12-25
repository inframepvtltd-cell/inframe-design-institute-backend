const { cloudinary } = require('../../configs/cloudinaryConfig');
const streamifier = require('streamifier');
const { sliderModel } = require('../../models/sliderModel');
const sharp = require('sharp')



const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
                format: "webp",
            },
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};




const addSlider = async (req, res) => {
    let allData = { ...req.body };

    try {
        if (req.file) {
            // Convert image to optimized WebP
            const webpBuffer = await sharp(req.file.buffer)
                .resize({ width: 1600 })     // optional: resize large images
                .webp({ quality: 80 })
                .toBuffer();

            // Upload optimized buffer to Cloudinary
            const result = await uploadToCloudinary(webpBuffer, "sliders");

            // Save Cloudinary URL
            allData.sliderImage = result.secure_url;
        }

        // Save in DB
        const slider = new sliderModel(allData);
        const data = await slider.save();

        res.send({
            status: 1,
            msg: "Slider added successfully",
            data,
        });

    } catch (err) {
        console.error("Slider Upload Error:", err);

        res.status(500).send({
            status: 0,
            msg: "Something went wrong",
            error: err.message,
        });
    }
};




const viewSlider = async (req, res) => {
    try {
        const sliderData = await sliderModel.find()
        res.send({
            status: 1,
            msg: 'slider all data',
            sliderData
        })

    } catch (error) {
        res.send({
            status: 0,
            msg: 'failed to fetch data',
            error
        })
    }
}

const viewSliderById = async (req, res) => {
    const { editId } = req.params;
    try {
        const findSliderById = await sliderModel.findOne({ _id: editId })
        if (findSliderById) {
            res.send({
                status: 1,
                msg: 'Slider fetched for edit',
                findSliderById,
            })
        }
        else {
            res.send({
                status: 0,
                msg: 'Slider not found'
            })
        }
    }
    catch (error) {
        res.send({
            status: 2,
            msg: 'something went wrong',
            error
        })
    }
}


const updateSlider = async (req, res) => {
    const { editId } = req.params;
    const allData = { ...req.body };  // directly spread req.body fields

    try {
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'sliders');
            allData.sliderImage = result.secure_url;
        }

        const result = await sliderModel.updateOne(
            { _id: editId },
            { $set: allData }
        );

        res.send({
            status: 1,
            msg: 'Slider updated successfully',
            result
        });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).send({
            status: 0,
            msg: 'Error updating slider',
            error,
        });
    }
};




module.exports = { addSlider, viewSlider, viewSliderById, updateSlider }