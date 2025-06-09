import {artistModel, Song, Album} from '../../models/artistModel.js';

const ownProduct = async (req, res) => {
    try {
        const {artistId} = req.params;
        const artist = await artistModel.findById(artistId);
        if (!artist) {
            return res.json({success: false, message: "Artist not found"});
        }

        const albums = await Album.find({ artistID: artistId });
        let songs = await Song.find({ artistID: artistId });
        const likesOfAlbum = await Promise.all(
            albums.map(async (album) => {
                let tmp = 0;
                for (let i = 0; i < album.songs.length; ++i) {
                    const song = await Song.findById(album.songs[i]);
                    if (song) {
                        tmp += song.likes;
                    }
                }
                return tmp; 
            })
        );

        songs = songs.filter(song => song.albumId === null);
        console.log(songs);

        res.json({ success: true, songs, albums, likesOfAlbum });

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
        const song = await Song.findById(songId);
        if (!song) {
            return res.json({success: false, message: "Song not found"});
        }
        res.json({success: true, song});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const getAlbumById = async (req, res) => {
    try {
        const {artistId, songId} = req.params;
        const artist = await artistModel.findById(artistId);
        if (!artist) {
            return res.json({success: false, message: "Artist not found"});
        }
        const album = await Album.findById(songId);
        if (!album) {
            return res.json({success: false, message: "Album not found"});
        }

        console.log(album);


        res.json({success: true, album});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {ownProduct, getSongById, getAlbumById};