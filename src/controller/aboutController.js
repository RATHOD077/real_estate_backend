const db = require('../config/db');

const aboutController = {
  // GET /api/about-project
  getAbout: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          title,
          description
        FROM about_project 
        WHERE id = 1
        LIMIT 1
      `);

      if (rows.length === 0) {
        return res.json({
          title: 'About Project',
          description: 'At Vighnaharta Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home...'
        });
      }

      res.json(rows[0]);
    } catch (err) {
      console.error('About GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch about content',
        error: err.message 
      });
    }
  },

  // PUT /api/about-project
  updateAbout: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }

      const [result] = await db.query(`
        UPDATE about_project 
        SET 
          title = ?,
          description = ?,
          updated_at = NOW()
        WHERE id = 1
      `, [title, description || null]);

      if (result.affectedRows === 0) {
        // Insert if row doesn't exist
        await db.query(`
          INSERT INTO about_project 
          (id, title, description, updated_at)
          VALUES (1, ?, ?, NOW())
        `, [title, description || null]);

        return res.json({ message: 'About content created successfully' });
      }

      res.json({ message: 'About content updated successfully' });
    } catch (err) {
      console.error('About UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update about content',
        error: err.message 
      });
    }
  }
};

module.exports = aboutController;