const db = require('../config/db');

const heroController = {
  // GET /api/hero
  getHero: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          main_heading,
          tagline AS sub_heading,
          one_bhk_price,
          two_bhk_price,
          location
        FROM hero_content 
        WHERE id = 1
        LIMIT 1
      `);

      if (rows.length === 0) {
        return res.json({
          main_heading: "THINKING OF A FANTASTIC VICINITY?",
          sub_heading: "20+ PODIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES",
          one_bhk_price: "69.99 Lacs*",
          two_bhk_price: "96.99 Lacs*",
          location: "BLDG NO. 223/224, CIRCLE - KANNAMWAR NAGAR I, VIKHROLI (EAST)"
        });
      }

      res.json(rows[0]);
    } catch (err) {
      console.error('Hero GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch hero content',
        error: err.message 
      });
    }
  },

  // PUT /api/hero
  updateHero: async (req, res) => {
    try {
      const { 
        main_heading, 
        sub_heading, 
        one_bhk_price, 
        two_bhk_price, 
        location 
      } = req.body;

      if (!main_heading || !sub_heading) {
        return res.status(400).json({ message: 'main_heading and sub_heading are required' });
      }

      const [result] = await db.query(`
        UPDATE hero_content 
        SET 
          main_heading = ?,
          tagline = ?,
          one_bhk_price = ?,
          two_bhk_price = ?,
          location = ?,
          updated_at = NOW()
        WHERE id = 1
      `, [
        main_heading,
        sub_heading,
        one_bhk_price || null,
        two_bhk_price || null,
        location || null
      ]);

      if (result.affectedRows === 0) {
        // Insert if row doesn't exist
        await db.query(`
          INSERT INTO hero_content 
          (id, project_name, main_heading, tagline, one_bhk_price, two_bhk_price, location, updated_at)
          VALUES (1, 'VIGHNAHARTA INFINITY', ?, ?, ?, ?, ?, NOW())
        `, [
          main_heading,
          sub_heading,
          one_bhk_price,
          two_bhk_price,
          location
        ]);

        return res.json({ message: 'Hero content created successfully' });
      }

      res.json({ message: 'Hero content updated successfully' });
    } catch (err) {
      console.error('Hero UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update hero content',
        error: err.message 
      });
    }
  }
};

module.exports = heroController;