import artistModel from '../../models/artistModel.js';

const ownProduct = async (req, res) => {
    try {
        const {artistId} = req.body;
        const artist = await artistModel.findById(artistId);
        if (!artist) {
            return res.json({success: false, message: "Artist not found"});
        }

        const songs = artist.songs;
        const album = artist.albums;

        res.json({success: true, songs, album});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {ownProduct};