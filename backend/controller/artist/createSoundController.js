import artistModel from "../../models/artistModel.js";
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

const createSong = async (req, res) => {
    try {
        const  {songTitle, genre, collaborators, id} = req.body

        let imageResult = await uploadToCloudinary(req.files.image[0])
        let audioResult = await uploadToCloudinary(req.files.audio[0])

        const artist = await artistModel.findById(id);
        if (!artist) {
            return res.json({ success: false, message: 'Artist not found' });
        }

        const formattedCollaborators = collaborators.split(',');

        const newSong = {
            title: songTitle,
            genre,
            imageUrl: imageResult.secure_url, 
            audioUrl: audioResult.secure_url,
            collaborators: formattedCollaborators
        };
        artist.songs.push(newSong);

        await artist.save();
        
        res.json({success: true, message: 'Product added successfully'})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}

const createAlbum = async (req, res) => {}


export { createSong, createAlbum };