import artistModel from '../../models/artistModel.js';

const ownProduct = async (req, res) => {
    try {
        const {artistId} = req.params;
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

const getSongById = async (req, res) => {
    try {
        const {artistId, songId} = req.params;
        const artist = await artistModel.findById(artistId);
        if (!artist) {
            return res.json({success: false, message: "Artist not found"});
        }
        const song = artist.songs.id(songId);
        if(!song) {
            return res.json({success: false, message: "Song not found"});
        }
        res.json({success: true, song});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {ownProduct, getSongById};