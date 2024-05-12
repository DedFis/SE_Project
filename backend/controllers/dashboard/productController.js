const formidable = require('formidable')
const cloudinary = require('cloudinary').v2
const productModel = require('../../models/productModel')

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
                console.log(images.length)

                for(let i = 0; i < images.length; i++){
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' })

                    allImageUrl = [...allImageUrl, result.url]
                }

                const product = await productModel.create({
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
                    brand: brand.trim()
                })

                console.log(product)
            } catch(error){
                console.log(error)
            }
        })
    }
}

module.exports = new productController()