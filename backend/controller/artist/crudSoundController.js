import { artistModel, Album, Song } from "../../models/artistModel.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "MISSING",
  api_key: process.env.CLOUDINARY_API_KEY || "MISSING",
  api_secret: process.env.CLOUDINARY_SECRET_KEY || "MISSING",
});

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.path,
      { resource_type: "auto" },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Return the result (which includes URL)
        }
      }
    );
  });
};

const createSong = async (req, res) => {
  try {
    const { songTitle, genre, collaborators, artistID, albumID, duration } =
      req.body;

    const artist = await artistModel.findById(artistID);
    if (!artist) {
      return res
        .status(404)
        .json({ success: false, message: "Artist not found" });
    }

    if (!req.files || !req.files.image || !req.files.audio) {
      return res.status(400).json({
        success: false,
        message: "Image and audio files are required",
      });
    }

    let imageResult = await uploadToCloudinary(req.files.image[0]);
    let audioResult = await uploadToCloudinary(req.files.audio[0]);

    const formattedCollaborators = collaborators
      ? collaborators.split(",")
      : [];

    const newSong = new Song({
      title: songTitle,
      genre: genre,
      imageUrl: imageResult.secure_url,
      audioUrl: audioResult.secure_url,
      collaborators: formattedCollaborators,
      artistID: artistID,
      name: artist.name,
      albumID: albumID || null,
      duration: duration,
    });

    await newSong.save();

    // If albumID is provided, add song to album
    if (albumID) {
      const album = await Album.findById(albumID);
      if (album) {
        album.songs.push(newSong._id);
        await album.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Song added successfully",
      song: newSong,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Album Handler
const createAlbum = async (req, res) => {
  try {
    const { albumTitle, id } = req.body;
    const { title, genre, duration, collaborators } = req.body.songs;

    const songAudios = req.files["songs[audio]"];
    const songImages = req.files["songs[image]"];

    const albumImage = req.files.albumImage[0];

    const artist = await artistModel.findById(id);
    if (!artist) {
      return res.json({ success: false, message: "Artist not found" });
    }

    const albumImageResult = await uploadToCloudinary(albumImage);

    const albumData = new Album({
      name: albumTitle,
      image: albumImageResult.secure_url,
      artistID: id,
      songs: [],
    });

    await albumData.save();

    const songPromises = title.map(async (songTitle, index) => {
      const songImageResult = await uploadToCloudinary(songImages[index]);
      const songAudioResult = await uploadToCloudinary(songAudios[index]);

      const newSong = new Song({
        title: songTitle,
        genre: genre[index],
        imageUrl: songImageResult.secure_url,
        audioUrl: songAudioResult.secure_url,
        artistID: id,
        name: artist.name,
        albumID: albumData._id,
        duration: duration[index],
        collaborators: collaborators[index].split(","),
      });

      await newSong.save();
      return newSong._id;
    });

    const songIds = await Promise.all(songPromises);

    // Update album with song references
    albumData.songs = songIds;
    await albumData.save();

    res.json({ success: true, message: "Album created successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const { artistId, songId } = req.params;
    const { songTitle, genre, collaborators } = req.body;

    let imageResult =
      req.files.image && (await uploadToCloudinary(req.files.image[0]));
    let audioResult =
      req.files.audio && (await uploadToCloudinary(req.files.audio[0]));

    let formattedCollaborators = collaborators;
    if (collaborators.length > 0) {
      formattedCollaborators = collaborators.split(",");
    } else {
      formattedCollaborators = [];
    }

    const artist = await artistModel.findById(artistId);
    if (!artist) {
      return res.json({ success: false, message: "Artist not found" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.json({ success: false, message: "Song not found" });
    }

    song.title = songTitle;
    song.genre = genre;
    song.imageUrl = imageResult ? imageResult.secure_url : song.imageUrl;
    song.audioUrl = audioResult ? audioResult.secure_url : song.audioUrl;
    song.collaborators = formattedCollaborators;

    await song.save();
    res.json({ success: true, message: "Song updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteSong = async (req, res) => {
  const {songId, artistId} = req.params;
  try{
      const artist = await artistModel.findById(artistId);
      if (!artist) {
        return res.json({ success: false, message: "Artist not found" });
      }
      await Song.deleteOne({__id: songId, artistID: artistId });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
 
}

const deleteAlbum = async (req, res) => {
  
    const { albumId, artistId } = req.params;
    try {
      const artist = await artistModel.findById(artistId);
      if (!artist) {
        return res.json({ success: false, message: "Artist not found" });
      }
      console.log("album, artist Id: " ,albumId, artistId);
      await Album.deleteOne({ _id: albumId, artistID: artistId });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
}

const updateAlbum = async (req, res) => {
   try {
    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    const {albumTitle, albumId} = req.body;
    let albumImage;
    if(req.body.albumImage){
      albumImage= req.body.albumImage;
    }
    else{
      const imageAlbumFieldName = "albumImage";
      const imageAlbumFile = req.files.find(file => file.fieldname === imageAlbumFieldName);
      albumImage = await uploadToCloudinary(imageAlbumFile);
      console.log("albumImage: ", albumImage);
    }
    await Album.findByIdAndUpdate(albumId, {name: albumTitle, image: albumImage.secure_url});
    
    const songs = req.body.song;
    for(let i = 0; i< songs.length; ++i){
      let songImage, songAudio;
      const {title, genre, duration} = songs[i];
      if(songs[i].image){
        songImage = songs[i].image;
      }
      else{
        const imageSongFieldName = `song[${i}][image]`;
        const imageFile = req.files.find(file => file.fieldname === imageSongFieldName);
        songImage = await uploadToCloudinary(imageFile);
        console.log("songImage: ", songImage);
      }

      if(songs[i].audio){
        songAudio = songs[i].audio;
      }
      else{
        const audioFieldName  = `song[${i}][audio]`;
        const audioFile = req.files.find(file => file.fieldname === audioFieldName);
        songAudio = await uploadToCloudinary(audioFile);
        console.log("songAudio: ", songAudio);
      }
      let collaborators = songs[i].collaborators == [''] ? [] : songs[i].collaborators ;

      await Song.findByIdAndUpdate(songs[i].id, {title, genre, duration, collaborators, imageUrl: typeof songImage === "string" ? songImage : songImage.secure_url, audioUrl: typeof songAudio === "string" ? songAudio : songAudio.secure_url });
    }
    res.json({ success: true, message: "Album updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while updating the album" });
  }
}

export { createSong, createAlbum, updateSong, deleteSong, deleteAlbum, updateAlbum };
