import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    collaborators: {
        type: [String],
    },
    likes: {
        type: Number,
        default: 0
    }
});

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    songs: [songSchema] 
});

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        default: 'https://res.cloudinary.com/df1i75amy/image/upload/v1737724061/Frame_ipoi4s.png'
    },
    phone: {
        type: String,
        default: '0000000000',
    },
    identityCard: {
        type: String,
        default: '0000000000000000'
    },
    password: {
        type: String,
        required: true
    },
    songs: {
        type: [songSchema],
        default: []
    },
    albums: {
        type: [albumSchema],
        default: []
    },
}, {
    timestamps: true,
    minimize: false
});

const artistModel = mongoose.models.artist ||  mongoose.model('artist', artistSchema);

export default artistModel;