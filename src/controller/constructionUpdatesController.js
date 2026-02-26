const db = require('../config/db');

const constructionUpdatesController = {
  // GET /api/construction-updates - Fetch all updates sorted by display_order
  getUpdates: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, title, status, description, display_order
        FROM construction_updates
        ORDER BY display_order ASC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Construction Updates GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch construction updates',
        error: err.message 
      });
    }
  },

  // POST /api/construction-updates - Create new update
  createUpdate: async (req, res) => {
    try {
      const { title, status, description, display_order = 999 } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }

      const [result] = await db.query(`
        INSERT INTO construction_updates (title, status, description, display_order)
        VALUES (?, ?, ?, ?)
      `, [title, status || null, description || null, display_order]);

      const newUpdate = {
        id: result.insertId,
        title,
        status,
        description,
        display_order
      };

      res.status(201).json(newUpdate);
    } catch (err) {
      console.error('Construction Update CREATE error:', err);
      res.status(500).json({ 
        message: 'Failed to create update',
        error: err.message 
      });
    }
  },

  // PUT /api/construction-updates/:id - Update existing update
  updateUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, status, description, display_order } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }

      const [result] = await db.query(`
        UPDATE construction_updates 
        SET 
          title = ?,
          status = ?,
          description = ?,
          display_order = COALESCE(?, display_order)
        WHERE id = ?
      `, [title, status || null, description || null, display_order, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Update not found' });
      }

      res.json({ message: 'Construction update updated successfully' });
    } catch (err) {
      console.error('Construction Update UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update construction update',
        error: err.message 
      });
    }
  },

  // DELETE /api/construction-updates/:id - Delete update
  deleteUpdate: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.query(`
        DELETE FROM construction_updates 
        WHERE id = ?
      `, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Update not found' });
      }

      res.json({ message: 'Construction update deleted successfully' });
    } catch (err) {
      console.error('Construction Update DELETE error:', err);
      res.status(500).json({ 
        message: 'Failed to delete construction update',
        error: err.message 
      });
    }
  }
};

module.exports = constructionUpdatesController;