import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    location: String,
    userId: String,
    likes: [],
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const posts = mongoose.models.posts || mongoose.model('posts', postSchema);
export default posts;