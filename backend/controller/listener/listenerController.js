import validator from 'validator';
import listenerModel from '../../models/listenerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET);
}

const register = async (req, res) => {
try {
    const {email, password, confirmPassword} = req.body;
    const isExists = await listenerModel.findOne({email});

    if(isExists) return res.json({success: false, message: 'User already exists'});
    
    if(!validator.isEmail(email)) return res.json({success: false, message: 'Invalid email'});

    if(password.length < 8) return res.json({success: false, message: 'Password must be at least 8 characters long'});

    if(password !== confirmPassword) return res.json({success: false, message: 'Passwords do not match'});

    const salt = await bcrypt.genSalt(10); 
    const hasedPassword = await bcrypt.hash(password, salt);

    const listener = new listenerModel({
        email,
        password: hasedPassword
    });

    try {
        const user = await listener.save();
        const token = createToken(user._id);

        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: 'Failed to register user'});
    }
} catch (error) {
    res.json({success: false, message:error.message});
}
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await listenerModel.findOne({email});
        if(!user) return res.json({success: false, message: 'User does not exist'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({success: false, message: 'Invalid credentials'});

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await listenerModel.findOne({email});
        if(!user) return res.json({success: false, message: 'User does not exist'});

        const token = createToken(user._id);

        const resetLink = `${process.env.LISTENER_URL}/resetpassword/${user._id}/${token}`;
        console.log(resetLink);
        res.json({success: true, resetLink});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const resetPassword = async(req,res) => {
    try {
        const {id, resetToken} = req.params;
        console.log(resetToken);
        console.log(id);
        const {newPassword, confirmPassword} = req.body;

        if(newPassword !== confirmPassword) return res.json({success: false, message: 'Passwords do not match'});

        const user = await listenerModel.findById(id);
        if(!user) return res.json({success: false, message: 'User does not exist'});

        const isMatch = jwt.verify(resetToken, process.env.JWT_SECRET);

        if(!isMatch) return res.json({success: false, message: 'Invalid token'});

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(newPassword, salt);

        await listenerModel.findByIdAndUpdate(id, {password: hasedPassword});

        res.json({success: true, message: 'Password reset successful'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {register, login, forgotPassword, resetPassword}