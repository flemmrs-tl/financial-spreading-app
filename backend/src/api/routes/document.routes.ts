import { Router } from 'express';

const router = Router();

/**
 * @route   GET /api/documents
 * @desc    Get all documents
 * @access  Private
 */
router.get('/', (req, res) => {
  res.json({ message: 'Get all documents - to be implemented' });
});

/**
 * @route   POST /api/documents
 * @desc    Upload a new document
 * @access  Private
 */
router.post('/', (req, res) => {
  res.json({ message: 'Upload document - to be implemented' });
});

/**
 * @route   GET /api/documents/:id
 * @desc    Get document by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  res.json({ message: `Get document ${req.params.id} - to be implemented` });
});

/**
 * @route   PUT /api/documents/:id
 * @desc    Update document metadata
 * @access  Private
 */
router.put('/:id', (req, res) => {
  res.json({ message: `Update document ${req.params.id} - to be implemented` });
});

/**
 * @route   DELETE /api/documents/:id
 * @desc    Delete document
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete document ${req.params.id} - to be implemented` });
});

/**
 * @route   POST /api/documents/:id/process
 * @desc    Start document processing with OCR
 * @access  Private
 */
router.post('/:id/process', (req, res) => {
  res.json({ message: `Process document ${req.params.id} - to be implemented` });
});

/**
 * @route   GET /api/documents/:id/status
 * @desc    Get document processing status
 * @access  Private
 */
router.get('/:id/status', (req, res) => {
  res.json({ message: `Get document ${req.params.id} status - to be implemented` });
});

export const documentRoutes = router;