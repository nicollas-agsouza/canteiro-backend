const Plant = require('../models/Plant');

exports.listPlants = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.location) filter.location = req.query.location;
    const plants = await Plant.find(filter).sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar plantas.' });
  }
};

exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Planta não encontrada.' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar planta.' });
  }
};

exports.createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json(plant);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos.' });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!plant) return res.status(404).json({ error: 'Planta não encontrada.' });
    res.json(plant);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar planta.' });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Planta não encontrada.' });
    res.json({ message: 'Planta removida.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover planta.' });
  }
};

exports.waterPlant = async (req, res) => {
  try {
    const { intervalDays = 3 } = req.body;
    const now  = new Date();
    const next = new Date(now);
    next.setDate(next.getDate() + intervalDays);

    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { lastWatered: now, nextWatering: next },
      { new: true }
    );
    if (!plant) return res.status(404).json({ error: 'Planta não encontrada.' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar rega.' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const total       = await Plant.countDocuments();
    const byStatus    = await Plant.aggregate([{ $group: { _id: '$status',   count: { $sum: 1 } } }]);
    const byLocation  = await Plant.aggregate([{ $group: { _id: '$location', count: { $sum: 1 } } }]);
    const needsWater  = await Plant.countDocuments({ nextWatering: { $lte: new Date() } });
    res.json({ total, byStatus, byLocation, needsWater });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar resumo.' });
  }
};
