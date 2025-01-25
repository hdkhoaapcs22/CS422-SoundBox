import mongoose from 'mongoose';

const listenerSchema = new mongoose.Schema({
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
        default: ''
    },
    dob: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    favoriteSongs: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    minimize: false
});

const listenerModel = mongoose.models.listener ||  mongoose.model('listener', listenerSchema);

export default listenerModel;