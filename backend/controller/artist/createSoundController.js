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

        let formattedCollaborators = collaborators
        if(collaborators.length > 0){
            formattedCollaborators = collaborators.split(',');
        }
        else{
            formattedCollaborators = []
        }

        const artist = await artistModel.findById(id);
        if (!artist) {
            return res.json({ success: false, message: 'Artist not found' });
        }

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

// Create Album Handler
const createAlbum = async (req, res) => {
    try {
        const { albumTitle, id} = req.body;
        const { title, genre,} = req.body.songs;

        const songAudios = req.files['songs[audio]']
        const songImages = req.files['songs[image]']

        const albumImage = req.files.albumImage[0]
        
        const artist = await artistModel.findById(id);
        if (!artist) {
            return res.json({ success: false, message: 'Artist not found' });
        }

        const songPromises = title.map(async (songTitle, index) => {
            const songImageResult = await uploadToCloudinary(songImages[index]);
            const songAudioResult = await uploadToCloudinary(songAudios[index]);

            return {
                title: songTitle,
                genre: genre[index],
                imageUrl: songImageResult.secure_url,  
                audioUrl: songAudioResult.secure_url,  
            };
        });

        const songsData = await Promise.all(songPromises);

        const albumImageResult = await uploadToCloudinary(albumImage);

        const albumData = {
            name: albumTitle,
            image: albumImageResult.secure_url,  
            songs: songsData 
        };

        await artistModel.findByIdAndUpdate(
            id, 
            { $push: { albums: albumData } },
            { new: true } 
        );
        

        res.json({ success: true, message: 'Album created successfully' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


export { createSong, createAlbum };