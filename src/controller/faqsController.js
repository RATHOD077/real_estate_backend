const db = require('../config/db');

const faqsController = {
  // GET /api/faqs - Fetch all FAQs sorted by display_order
  getFaqs: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, question, answer, display_order
        FROM faqs
        ORDER BY display_order ASC
      `);
      res.json(rows);
    } catch (err) {
      console.error('FAQs GET error:', err);
      res.status(500).json({ 
        message: 'Failed to fetch FAQs',
        error: err.message 
      });
    }
  },

  // POST /api/faqs - Create new FAQ
  createFaq: async (req, res) => {
    try {
      const { question, answer, display_order = 999 } = req.body;

      if (!question || !answer) {
        return res.status(400).json({ message: 'question and answer are required' });
      }

      const [result] = await db.query(`
        INSERT INTO faqs (question, answer, display_order)
        VALUES (?, ?, ?)
      `, [question, answer, display_order]);

      const newFaq = {
        id: result.insertId,
        question,
        answer,
        display_order
      };

      res.status(201).json(newFaq);
    } catch (err) {
      console.error('FAQ CREATE error:', err);
      res.status(500).json({ 
        message: 'Failed to create FAQ',
        error: err.message 
      });
    }
  },

  // PUT /api/faqs/:id - Update existing FAQ
  updateFaq: async (req, res) => {
    try {
      const { id } = req.params;
      const { question, answer, display_order } = req.body;

      if (!question || !answer) {
        return res.status(400).json({ message: 'question and answer are required' });
      }

      const [result] = await db.query(`
        UPDATE faqs 
        SET 
          question = ?,
          answer = ?,
          display_order = COALESCE(?, display_order)
        WHERE id = ?
      `, [question, answer, display_order, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'FAQ not found' });
      }

      res.json({ message: 'FAQ updated successfully' });
    } catch (err) {
      console.error('FAQ UPDATE error:', err);
      res.status(500).json({ 
        message: 'Failed to update FAQ',
        error: err.message 
      });
    }
  },

  // DELETE /api/faqs/:id - Delete FAQ
  deleteFaq: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.query(`
        DELETE FROM faqs 
        WHERE id = ?
      `, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'FAQ not found' });
      }

      res.json({ message: 'FAQ deleted successfully' });
    } catch (err) {
      console.error('FAQ DELETE error:', err);
      res.status(500).json({ 
        message: 'Failed to delete FAQ',
        error: err.message 
      });
    }
  }
};

module.exports = faqsController;