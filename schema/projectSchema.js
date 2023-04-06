const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  primaryOwner: { type: String, required: true },
  secondaryOwner: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  description: { type: String }
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;
