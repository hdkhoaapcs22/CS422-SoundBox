import validator from 'validator';
import listenerModel from '../../models/listenerModel.js';
import bcrypt from 'bcrypt';

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
        const id = user._id;

        res.json({success: true, id});
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

        res.json({success: true, id: user._id});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

const forgotPassword = async (req, res) => {
}

export {register, login, forgotPassword}