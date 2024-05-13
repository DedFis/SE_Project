const sellerModel = require('../../models/sellerModel')
const { responseReturn } = require('../../utiles/response')

class sellerController {
    get_seller_request = async(req, res) => {
        const {page, searchValue, parPage} = req.query
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)
    
        try {
            if(searchValue){
                
            }
            else{
                const sellers = await sellerModel.find({status: 'pending'}).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalSeller = await sellerModel.find({status: 'pending'}).countDocuments()
                responseReturn(res, 200, {totalSeller, sellers})
            }
        } catch (error) {
            
        }
    }
}

module.exports = new sellerController()