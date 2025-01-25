import listenerModel from '../models/listenerModel.js';
import artistModel from '../models/artistModel.js'; 
import cloudinary from 'cloudinary'

const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, { resource_type: 'auto' }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result); // Return the result (which includes URL)
            }
        });
    });
};

const getUserInformation = async (req, res) => {
    try {
        const { userId, role } = req.params;
        let user;
        switch(role){
            case 'listener':
                user = await listenerModel.findById(userId);
                break;
            case 'artist':
                user = await artistModel.findById(userId);
                break;
            }
        if(user) return res.json({success: true, user});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


const updateUserInformation = async (req, res) => {
    try {
        const { userId, role } = req.params;
        const {name, email, phone, dob, gender} = req.body;
        let image;
        if(req.file){
            image = await uploadToCloudinary(req.file);
        }
        console.log(typeof gender);

        let user;
        switch(role){
            case 'listener':
                if(image) user = await listenerModel.findByIdAndUpdate(userId, {name, email, phone, dob, gender, avatarUrl: image.secure_url});
                else user = await listenerModel.findByIdAndUpdate(userId, {name, email, phone, dob, gender});
                break;
            case 'artist':
                if(image) user = await artistModel.findByIdAndUpdate(userId, {name, email, phone, dob, gender, avatarUrl: image.secure_url});
                else user = await artistModel.findByIdAndUpdate(userId, {name, email, phone, dob, gender});
                break;
        }
        if(user) return res.json({success: true, message: 'Update user information successfully'});
        else return res.json({success: false, message: 'Update user information failed'});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

};


export { getUserInformation, updateUserInformation };