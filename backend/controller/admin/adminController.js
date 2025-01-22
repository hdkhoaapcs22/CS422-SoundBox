import artistModel from '../../models/artistModel.js';
import validator from 'validator';

const createArtist = async (req, res) => {
    try {
        const {name, email, phone, identityCard, dob, gender, password} = req.body;
        console.log(req.body);
        const isExists = await artistModel.findOne({email});

        if(isExists) return res.json({success: false, message: 'User already exists'});
        
        if(!validator.isEmail(email)) return res.json({success: false, message: 'Invalid email'});

        const artist = new artistModel({
            name,
            email,
            phone,
            identityCard,
            gender,
            dob,
            password
        });

            const user = await artist.save();
            const id = user._id;

            res.json({success: true, id});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};


export {createArtist}