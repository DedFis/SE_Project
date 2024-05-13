const formidable = require('formidable')
const cloudinary = require('cloudinary').v2
const productModel = require('../../models/productModel');
const { responseReturn } = require('../../utiles/response');

class productController{
    addProduct = async(req, res) => {
        const {id} = req;
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async(err, field, files) => {
            let name = field.name[0];
            let category = field.category[0];
            let description = field.description[0];
            let stock = field.stock[0];
            let price = field.price[0];
            let discount = field.discount[0];
            let shopName = field.shopName[0];
            let brand = field.brand[0];

            // Extract image filepaths
            let images = files.images;

            name = name.trim()
            const slug = name.split(' ').join('-')

            cloudinary.config({
                cloud_name : process.env.cloud_name,
                api_key : process.env.api_key,
                api_secret : process.env.api_secret,
                secure : true
            })

            try{
                let allImageUrl = [];
                let allImageId = [];
                console.log(images.length)

                for(let i = 0; i < images.length; i++){
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' })

                    allImageUrl = [...allImageUrl, result.url]
                    allImageId = [...allImageId, result.public_id]
                }

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    images_id: allImageId,
                    brand: brand.trim()
                })
                responseReturn(res, 201, {message: "product added!"})
            } catch(error){
                responseReturn(req, 500, {error: error.message})
            }
        })
    }

    products_get = async(req, res) => {
        const { parPage, page, searchValue } = req.query
        const {id} = req;

        const skipPage = parseInt(parPage) * (parseInt(page) - 1)
        
        try{
            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search : searchValue },
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalProduct = await productModel.find({
                    $text: { $search : searchValue },
                    sellerId: id
                }).countDocuments()
                
                responseReturn(res, 200, {totalProduct, products})
            } 
            else{
                const products = await productModel.find({sellerId: id}).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalProduct = await productModel.find({sellerId: id}).countDocuments()
                responseReturn(res, 200, {totalProduct, products})
            }
        } catch(error){
            console.log(error.message)
        }
    }

    product_get = async(req, res) => {
        const {productId} = req.params;
        try{
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product})
        } catch(error){
            console.log(error.message)
        }
    }

    product_update = async(req, res) => {
        let {name, description, discount, price, brand, productId, stock, category} = req.body;
        name = name.trim()
        const slug = name.split(' ').join('-')

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, discount, price, brand, productId, stock, slug, category
            })
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product, message: 'product update success!'})
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }

    product_image_update = async(req, res) => {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async(err, field, files) => {
            const {productId, oldImage} = field;
            const newImage = files.newImage[0]

            console.log(oldImage)

            if(err){
                responseReturn(res, 404, {error: err.message})
            } else{
                try {
                    cloudinary.config({
                        cloud_name : process.env.cloud_name,
                        api_key : process.env.api_key,
                        api_secret : process.env.api_secret,
                        secure : true
                    })

                    const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' })  
    
                    if(result){
                        let { images } = await productModel.findById(productId, { images: 1 })
                        let { images_id } = await productModel.findById(productId, { images_id: 1 })

                        const index = images.findIndex(image => image === oldImage[0])
                        await cloudinary.uploader.destroy(images_id[index])

                        images[index] = result.url;
                        images_id[index] = result.public_id;
    
                        await productModel.findByIdAndUpdate(productId, {
                            images, images_id
                        })
    
                        const product = await productModel.findById(productId)
                        responseReturn(res, 200, {product, message: 'product image update success!'})
                    }
                    else{
                        responseReturn(res, 404, {error: 'image upload failed!'})
                    }
                } catch (error) {
                    responseReturn(res, 404, {error: error.message})
                }
            }
        })
    }
}

module.exports = new productController()