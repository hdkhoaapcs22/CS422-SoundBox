import mongoose from 'mongoose';

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
        type: Array,
        default: []
    },
    albums: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    minimize: false
});

const artistModel = mongoose.models.artist ||  mongoose.model('artist', artistSchema);

export default artistModel;