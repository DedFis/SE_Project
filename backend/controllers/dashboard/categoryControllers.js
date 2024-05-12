const categoryModel = require('../../models/categoryModel')
const formidable = require('formidable')
const { responseReturn } = require('../../utiles/response')
const cloudinary = require('cloudinary').v2

class categoryControllers {
    add_category = async(req, res) => {
        const form = new formidable.IncomingForm()
        form.parse(req, async(err, fields, files) => {
            if (err) {
                responseReturn(res, 404, { error : 'Something went wrong' })
            } else {
                let name = fields.name[0]
                let image = files.image[0].filepath

                name = name.trim()
                
                const slug = name.split(' ').join('-')

                cloudinary.config({
                    cloud_name : process.env.cloud_name,
                    api_key : process.env.api_key,
                    api_secret : process.env.api_secret,
                    secure : true
                })

                try {
                    const result = await cloudinary.uploader.upload(image, { folder: 'categorys' })

                    if (result) {
                        const category = await categoryModel.create({
                            name,
                            slug,
                            image : result.url
                        })

                        responseReturn(res, 201, { category, message : 'Category Added' })
                    } else {
                        responseReturn(res, 404, { error : 'Image upload failed' })
                    }
                } catch (error) {
                    responseReturn(res, 500, { error : 'Internal server error' })
                }
            }
        })
    }

    get_category = async(req, res) => {
        const { parPage, page, searchValue } = req.query

        try {
            let skipPage = ''
            if(parPage && page){
                skipPage = parseInt(parPage) * (parseInt(page) - 1)
            }
            if (searchValue && page && parPage) {
                const categorys = await categoryModel.find({
                    $text: { $search : searchValue }
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalCategory = await categoryModel.find({
                    $text: { $search : searchValue }
                }).countDocuments()
                
                responseReturn(res, 200, {totalCategory, categorys})
            } 
            else if (searchValue === '' && page && parPage) {
                const categorys = await categoryModel.find({
                    
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalCategory = await categoryModel.find({}).countDocuments()
                responseReturn(res, 200, {totalCategory, categorys})
            }
            else {
                const categorys = await categoryModel.find({
                    
                }).sort({ createdAt: -1 })

                const totalCategory = await categoryModel.find({
                    
                }).countDocuments()

                responseReturn(res, 200, {totalCategory, categorys})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new categoryControllers()