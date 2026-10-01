import { Router } from 'express';
import multer from 'multer';
import {
  isAiConfigured,
  explainWhatIfScenario,
  explainFinancialDocument,
  generateHealthNarrativeAndRoast,
  verifyMythFactClaim,
  chatWithFinancialMentor,
} from './geminiService';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const apiRouter = Router();

// Health/Status check
apiRouter.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: isAiConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// 1. What-If Scenario Explanation
apiRouter.post('/what-if/explain', async (req, res) => {
  try {
    if (!isAiConfigured()) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }
    const result = await explainWhatIfScenario(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('What-If AI Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to explain scenario' });
  }
});

// 2. Financial Document Explainer
apiRouter.post('/document-explainer', upload.single('document'), async (req, res) => {
  try {
    if (!isAiConfigured()) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No document file uploaded' });
    }
    const language = (req.body.language as string) || 'en';
    const result = await explainFinancialDocument(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname,
      language
    );
    res.json(result);
  } catch (error: any) {
    console.error('Document Explainer Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to analyze document' });
  }
});

// 3. Financial Health Narrative & AI Roast
apiRouter.post('/financial-health', async (req, res) => {
  try {
    if (!isAiConfigured()) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }
    const result = await generateHealthNarrativeAndRoast(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Financial Health AI Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate health diagnostic' });
  }
});

// 4. Check If Myth or Fact Claim Evaluation
apiRouter.post('/myth-or-fact', upload.single('image'), async (req, res) => {
  try {
    if (!isAiConfigured()) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }
    const claim = (req.body.claim as string) || '';
    const language = (req.body.language as string) || 'en';
    const imageBuffer = req.file?.buffer;
    const imageMimeType = req.file?.mimetype;

    const result = await verifyMythFactClaim({
      claim,
      imageBuffer,
      imageMimeType,
      language,
    });
    res.json(result);
  } catch (error: any) {
    console.error('Myth or Fact Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to verify claim' });
  }
});

// 5. AI Financial Mentor Chat
apiRouter.post('/mentor', async (req, res) => {
  try {
    if (!isAiConfigured()) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }
    const result = await chatWithFinancialMentor(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Mentor Chat Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to converse with mentor' });
  }
});
