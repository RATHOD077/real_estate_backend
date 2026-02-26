const db = require('../config/db');

const amenitiesController = {
  // GET /api/amenities - Fetch all amenities (sorted by display_order)
  getAmenities: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, title, display_order
        FROM amenities
        ORDER BY display_order ASC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Amenities GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch amenities',
        error: err.message 
      });
    }
  },

  // POST /api/amenities - Create new amenity
  createAmenity: async (req, res) => {
    try {
      const { title, display_order = 999 } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }

      const [result] = await db.query(`
        INSERT INTO amenities (title, display_order)
        VALUES (?, ?)
      `, [title, display_order]);

      const newAmenity = {
        id: result.insertId,
        title,
        display_order
      };

      res.status(201).json(newAmenity);
    } catch (err) {
      console.error('Amenities CREATE error:', err);
      res.status(500).json({ 
        message: 'Failed to create amenity',
        error: err.message 
      });
    }
  },

  // PUT /api/amenities/:id - Update existing amenity
  updateAmenity: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, display_order } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }

      const [result] = await db.query(`
        UPDATE amenities 
        SET 
          title = ?,
          display_order = COALESCE(?, display_order)
        WHERE id = ?
      `, [title, display_order, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Amenity not found' });
      }

      res.json({ message: 'Amenity updated successfully' });
    } catch (err) {
      console.error('Amenities UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update amenity',
        error: err.message 
      });
    }
  },

  // DELETE /api/amenities/:id - Delete amenity
  deleteAmenity: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.query(`
        DELETE FROM amenities 
        WHERE id = ?
      `, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Amenity not found' });
      }

      res.json({ message: 'Amenity deleted successfully' });
    } catch (err) {
      console.error('Amenities DELETE error:', err);
      res.status(500).json({ 
        message: 'Failed to delete amenity',
        error: err.message 
      });
    }
  }
};

module.exports = amenitiesController;