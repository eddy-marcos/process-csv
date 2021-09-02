import express from 'express';
import multer from 'multer';
import { parseCsv } from '../controllers/api/csv.js';
const router = express.Router();
const upload = multer({ dest: 'file-storage/' });

/**
 *
 * @name Create a txt file from a comma separated value
 * @route {POST} api/csv/:providerName
 * @routeparam  {string} providerName - the providername that sent the file.
 * @bodyparam   {file}  file - The csv file to be sent. 
 *
 * @return {Object} PLACEHOLDER
 */

router.post('/:providerName', upload.single('file'), parseCsv);


export default router; 
