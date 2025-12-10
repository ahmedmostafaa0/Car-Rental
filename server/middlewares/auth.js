import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.json({success: false, message: 'Not Authorized'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}