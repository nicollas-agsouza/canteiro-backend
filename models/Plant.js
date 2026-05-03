const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, trim: true, default: '' },
    location: {
      type: String,
      enum: ['interno', 'externo', 'varanda', 'horta'],
      default: 'interno'
    },
    status: {
      type: String,
      enum: ['saudavel', 'precisando-de-cuidado', 'dormindo', 'falecida'],
      default: 'saudavel'
    },
    notes: { type: String, default: '' },
    lastWatered: { type: Date, default: null },
    nextWatering: { type: Date, default: null },
    acquiredAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plant', plantSchema);
