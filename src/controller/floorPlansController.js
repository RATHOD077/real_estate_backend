const db = require('../config/db');

const floorPlansController = {
  // GET /api/floor-plans - Fetch all floor plans sorted by display_order
  getFloorPlans: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, plan_type, area, price_info, display_order
        FROM floor_plans
        ORDER BY display_order ASC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Floor Plans GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch floor plans',
        error: err.message 
      });
    }
  },

  // POST /api/floor-plans - Create new floor plan
  createFloorPlan: async (req, res) => {
    try {
      const { plan_type, area, price_info, display_order = 999 } = req.body;

      if (!plan_type) {
        return res.status(400).json({ message: 'plan_type is required' });
      }

      const [result] = await db.query(`
        INSERT INTO floor_plans (plan_type, area, price_info, display_order)
        VALUES (?, ?, ?, ?)
      `, [plan_type, area || null, price_info || null, display_order]);

      const newPlan = {
        id: result.insertId,
        plan_type,
        area,
        price_info,
        display_order
      };

      res.status(201).json(newPlan);
    } catch (err) {
      console.error('Floor Plan CREATE error:', err);
      res.status(500).json({ 
        message: 'Failed to create floor plan',
        error: err.message 
      });
    }
  },

  // PUT /api/floor-plans/:id - Update existing floor plan
  updateFloorPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const { plan_type, area, price_info, display_order } = req.body;

      if (!plan_type) {
        return res.status(400).json({ message: 'plan_type is required' });
      }

      const [result] = await db.query(`
        UPDATE floor_plans 
        SET 
          plan_type = ?,
          area = ?,
          price_info = ?,
          display_order = COALESCE(?, display_order)
        WHERE id = ?
      `, [plan_type, area || null, price_info || null, display_order, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Floor plan not found' });
      }

      res.json({ message: 'Floor plan updated successfully' });
    } catch (err) {
      console.error('Floor Plan UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update floor plan',
        error: err.message 
      });
    }
  },

  // DELETE /api/floor-plans/:id - Delete floor plan
  deleteFloorPlan: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.query(`
        DELETE FROM floor_plans 
        WHERE id = ?
      `, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Floor plan not found' });
      }

      res.json({ message: 'Floor plan deleted successfully' });
    } catch (err) {
      console.error('Floor Plan DELETE error:', err);
      res.status(500).json({ 
        message: 'Failed to delete floor plan',
        error: err.message 
      });
    }
  }
};

module.exports = floorPlansController;
