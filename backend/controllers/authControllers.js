const { response } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel')
const sellerModel = require('../models/sellerModel')
const {responseReturn} = require('../utiles/response')
const {createToken} = require('../utiles/tokenCreate')

class authControllers{
    admin_login = async(req,res)=>{
       const {email, password} = req.body
       try {
            const admin = await adminModel.findOne({email}).select('+password')
            if(admin){
                const match = await bcrypt.compare(password, admin.password)
                if(match){
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7*24*60*60*1000)
                    })
                    responseReturn(res, 200, {token, message: 'Login success!'})
                }
                else{
                    responseReturn(res, 404, {error: "Password wrong!"})
                }
            }
            else{
                responseReturn(res, 404, {error: "Email not found!"})
            }
       } catch (error) {
        responseReturn(res, 500, {error: error.message})
       }
    }

    seller_register = async(req, req) => {
        const {email, name, password} = req.body
        try {
            const getUser = await sellerModel.find({email})
            if (getUser) {
                responseReturn(res, 404, {error: 'Email already exist'})
            } else {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password : await bcrypt.hash(password, 10),
                    method : "menualy",
                    shopInfo : {}
                })
                console.log(seller)
            }
        } catch(error) {
            console.log(error)
        }
    }

    getUser = async(req, res) => {
        const {id, role} = req;

        try {
            if(role === 'admin'){
                const user = await adminModel.findById(id)
                responseReturn(res, 404, {userInfo : user})
            }
            else{
                console.log('seller info')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new authControllers()