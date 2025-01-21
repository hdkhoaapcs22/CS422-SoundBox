import validator from 'validator';
import listenerModel from '../../models/listenerModel.js';
import nodemailer  from 'nodemailer';

const register = async (req, res) => {
try {
    const {email, password} = req.body;
    const isExists = await listenerModel.findOne({email});

    if(isExists) return res.json({success: false, message: 'User already exists'});
    
    if(!validator.isEmail(email)) return res.json({success: false, message: 'Invalid email'});

    const listener = new listenerModel({
        email,
        password: password
    });

        const user = await listener.save();
        const id = user._id;

        res.json({success: true, id});
} catch (error) {
    res.json({success: false, message:error.message});
}
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await listenerModel.findOne({email});
        if(!user) return res.json({success: false, message: 'User does not exist'});

        const isMatch = password === user.password;
        if(!isMatch) return res.json({success: false, message: 'Invalid credentials'});

        const id = user._id;

        res.json({success: true, id});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

const forgotPassword = async (req, res) => {
    try {
        const {userName, email} = req.body;

        const user = await listenerModel.findOne({email});
        if(!user) return res.json({success: false, message: 'User does not exist'});
        if(user.name != userName)   return res.json({success: false, message: 'Invalid username'});

        const resetLink = `${process.env.LISTENER_URL}/reset-password/${user._id}`;
        console.log(resetLink);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.APP_PASSWORD
            }
          });
          
          let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `Click the link below to reset your password: ${resetLink}`,
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>`
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.json({success: true, resetLink});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const resetPassword = async(req,res) => {
    try {
        const {id} = req.params;
        const {newPassword} = req.body;

        const user = await listenerModel.findById(id);
        if(!user) return res.json({success: false, message: 'User does not exist'});

        await listenerModel.findByIdAndUpdate(id, {password: newPassword});

        res.json({success: true, message: 'Password reset successful'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {register, login, forgotPassword, resetPassword}