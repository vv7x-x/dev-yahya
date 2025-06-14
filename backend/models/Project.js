import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  github: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Project', ProjectSchema);
