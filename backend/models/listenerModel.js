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