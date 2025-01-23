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
    }
});

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [songSchema] // Store the full song objects, not just ObjectIds
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
    phone: {
        type: String,
        default: '0000000000',
    },
    gender: {
        type: String,
        default: 'Not Specified'
    },
    dob: {
        type: Date,
        default: Date.now
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