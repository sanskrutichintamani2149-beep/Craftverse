import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load .env.local if present
dotenv.config({ path: '.env.local' });
dotenv.config();

const configuredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const candidateModels = Array.from(new Set([configuredModel, 'gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash']));

const apiKey = process.env.GEMINI_API_KEY;

let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey.trim().length > 0) {
  aiClient = new GoogleGenAI({ apiKey: apiKey.trim() });
}

export const isAiConfigured = (): boolean => {
  return aiClient !== null;
};

async function generateWithFallback(params: any): Promise<any> {
  if (!aiClient) throw new Error('AI service is not configured');
  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      const response = await aiClient.models.generateContent({
        ...params,
        model,
      });
      return response;
    } catch (err: any) {
      console.warn(`Model ${model} request warning:`, err?.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error('All model candidates failed');
}

const getLanguageInstruction = (lang: string): string => {
  if (lang === 'hi') {
    return 'IMPORTANT: Respond ENTIRELY in Hindi (हिन्दी) using clean, grammatically correct Devanagari script. Do not mix English phrases except essential proper nouns like DhanaDrishti, GST, TDS, EPF, CIBIL, SIP.';
  }
  if (lang === 'mr') {
    return 'IMPORTANT: Respond ENTIRELY in Marathi (मराठी) using clean, grammatically correct Devanagari script. Do not mix English phrases except essential proper nouns like DhanaDrishti, GST, TDS, EPF, CIBIL, SIP.';
  }
  return 'IMPORTANT: Respond in simple, beginner-friendly Indian English with zero unnecessary financial jargon.';
};

/**
 * 1. What-If Scenario AI Explanation
 */
export async function explainWhatIfScenario(data: {
  baseline: any;
  simulated: any;
  deltaInHandMonthly: number;
  deltaSavingsMonthly: number;
  deltaSavingsAnnual: number;
  salaryChangePercent: number;
  expenseChangeAmount: number;
  savingsBoostMonthly: number;
  language: string;
}) {
  if (!aiClient) throw new Error('AI service is not configured');

  const langInstr = getLanguageInstruction(data.language);

  const prompt = `You are the DhanaDrishti AI Financial Advisor for India.
${langInstr}

The user has simulated a what-if financial scenario:
- Base Annual CTC: ₹${data.baseline.ctc?.toLocaleString('en-IN')}
- Base Monthly In-Hand: ₹${Math.round(data.baseline.inHandMonthly || 0).toLocaleString('en-IN')}
- Base Monthly Expenses: ₹${Math.round(data.baseline.monthlyExpenses || 0).toLocaleString('en-IN')}
- Base Potential Monthly Savings: ₹${Math.round(data.baseline.potentialMonthlySavings || 0).toLocaleString('en-IN')}

Scenario changes:
- Salary Change: ${data.salaryChangePercent}%
- Expense Shift: ₹${data.expenseChangeAmount}
- Dedicated Monthly SIP Boost: ₹${data.savingsBoostMonthly}

Calculated Outcomes (Deterministic):
- New Monthly In-Hand: ₹${Math.round(data.simulated.inHandMonthly || 0).toLocaleString('en-IN')} (Delta: ${data.deltaInHandMonthly >= 0 ? '+' : ''}₹${Math.round(data.deltaInHandMonthly).toLocaleString('en-IN')})
- New Monthly Savings: ₹${Math.round(data.simulated.potentialMonthlySavings || 0).toLocaleString('en-IN')} (Delta: ${data.deltaSavingsMonthly >= 0 ? '+' : ''}₹${Math.round(data.deltaSavingsMonthly).toLocaleString('en-IN')})
- Annual Wealth Delta: ${data.deltaSavingsAnnual >= 0 ? '+' : ''}₹${Math.round(data.deltaSavingsAnnual).toLocaleString('en-IN')}

Explain the impact of this change in 3 short, punchy paragraphs:
1. Executive summary of the change and net monthly impact.
2. Recommended practical allocation for the surplus (e.g. emergency fund, mutual fund SIP, debt payoff) or how to cushion a negative shift.
3. Long-term wealth takeaway.
Do not invent any new numbers; reference only the numbers given above.`;

  const response = await generateWithFallback({
    contents: prompt,
  });

  return { explanation: response.text || '' };
}

/**
 * 2. Multimodal Financial Document Explainer
 */
export async function explainFinancialDocument(fileBuffer: Buffer, mimeType: string, fileName: string, language: string) {
  if (!aiClient) throw new Error('AI service is not configured');

  const langInstr = getLanguageInstruction(language);

  const base64Data = fileBuffer.toString('base64');

  const prompt = `You are a financial document auditor and educator for young earners in India.
${langInstr}

Analyze the attached document ("${fileName}").
Read the real text, numbers, and clauses inside this specific document carefully.
Return ONLY valid JSON matching this exact structure:
{
  "isFinancialDocument": boolean,
  "unreadableReason": string or null,
  "documentType": string,
  "summary": string,
  "importantAmounts": [
    { "label": string, "amount": string, "note": string }
  ],
  "deductions": [
    { "label": string, "amount": string, "note": string }
  ],
  "criticalDates": [
    { "label": string, "date": string }
  ],
  "keyTerms": string[],
  "takeaways": string[]
}

Rules:
1. If the file is NOT a financial document (e.g. random selfie, landscape, receipt of non-financial nature) or is completely unreadable/empty, set "isFinancialDocument": false and describe why in "unreadableReason".
2. Extract actual numbers and deductions present in this document (e.g. Gross Pay, Basic, HRA, EPF, Professional Tax, TDS, Loan Principal, Interest Rate, EMI, Late fees).
3. Translate all explanations, summaries, notes and takeaways into the requested language (${language}).
4. Return pure JSON without markdown backticks.`;

  const response = await generateWithFallback({
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType || 'application/pdf',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  const rawText = response.text || '{}';
  const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleanJson);
  } catch {
    return {
      isFinancialDocument: true,
      documentType: 'Financial Statement',
      summary: cleanJson,
      importantAmounts: [],
      deductions: [],
      criticalDates: [],
      keyTerms: ['Financial Record'],
      takeaways: ['Please review the summary text above for extracted clauses.'],
    };
  }
}

/**
 * 3. Financial Health Assessment Narrative & AI Roast
 */
export async function generateHealthNarrativeAndRoast(data: {
  overallScore: number;
  ratingLabel: string;
  savingsRate: number;
  expenseRatio: number;
  emergencyMonths: number;
  monthlySavings: number;
  monthlyInHand: number;
  monthlyExpenses: number;
  language: string;
  wantRoast?: boolean;
}) {
  if (!aiClient) throw new Error('AI service is not configured');

  const langInstr = getLanguageInstruction(data.language);

  const prompt = `You are DhanaDrishti's Financial Health Diagnostic AI for Indian earners.
${langInstr}

User's Verified Financial Diagnostics:
- Overall Score: ${data.overallScore}/100 (${data.ratingLabel})
- Monthly In-Hand: ₹${Math.round(data.monthlyInHand).toLocaleString('en-IN')}
- Monthly Expenses: ₹${Math.round(data.monthlyExpenses).toLocaleString('en-IN')}
- Potential Monthly Savings: ₹${Math.round(data.monthlySavings).toLocaleString('en-IN')}
- Savings Rate: ${data.savingsRate.toFixed(1)}%
- Expense to Income Ratio: ${data.expenseRatio.toFixed(1)}%
- Emergency Runway: ${data.emergencyMonths.toFixed(1)} months of expenses

Generate a response in valid JSON matching this schema:
{
  "diagnosticNarrative": string,
  "topStrengths": string[],
  "areasToImprove": string[],
  "actionSteps": string[],
  "roast": string,
  "roastPunchline": string
}

Rules for the AI Roast:
- Playful, witty, constructive Indian financial reality check.
- Never insulting, abusive, or hateful.
- Refer to their real numbers (e.g. spending habits, momos, Swiggy, savings rate).
- In the requested language (${data.language}).
Return pure JSON with no markdown wrapping.`;

  const response = await generateWithFallback({
    contents: prompt,
  });

  const rawText = response.text || '{}';
  const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * 4. Check If Myth or Fact Claim Evaluation
 */
export async function verifyMythFactClaim(data: {
  claim: string;
  imageBuffer?: Buffer;
  imageMimeType?: string;
  language: string;
}) {
  if (!aiClient) throw new Error('AI service is not configured');

  const langInstr = getLanguageInstruction(data.language);

  const prompt = `You are a financial facts and fraud auditor for India.
${langInstr}

Evaluate this financial statement or viral advice:
"${data.claim}"

Verify the claim against official Indian regulatory standards (Reserve Bank of India - RBI, Securities and Exchange Board of India - SEBI, Income Tax Act, IRDAI, or credit bureau guidelines).

Return pure JSON matching this exact schema:
{
  "verdict": "FACT" or "MYTH" or "DEPENDS ON CONTEXT",
  "confidence": number between 70 and 99,
  "explanation": string,
  "reasoning": string,
  "sources": string[]
}

Rules:
1. "sources" MUST be real, verifiable regulatory frameworks or standard Indian guidelines (e.g. "Reserve Bank of India (RBI) Master Direction on Credit Card Operations", "Securities and Exchange Board of India (SEBI) Mutual Funds Regulations 1996", "Income Tax Act, 1961 Section 87A", "TransUnion CIBIL Scoring Methodology"). Never invent dummy URLs.
2. In the requested language (${data.language}).
3. Return pure JSON without markdown backticks.`;

  const parts: any[] = [];
  if (data.imageBuffer && data.imageMimeType) {
    parts.push({
      inlineData: {
        data: data.imageBuffer.toString('base64'),
        mimeType: data.imageMimeType,
      },
    });
  }
  parts.push({ text: prompt });

  const response = await generateWithFallback({
    contents: [{ role: 'user', parts }],
  });

  const rawText = response.text || '{}';
  const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * 5. Conversational AI Financial Mentor
 */
export async function chatWithFinancialMentor(data: {
  message: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  userContext: {
    jobTitle?: string;
    annualCtc?: number;
    monthlyInHand?: number;
    monthlyExpenses?: number;
    existingSavings?: number;
    goalsCount?: number;
    recentCalculations?: Array<{ term: string; result: string }>;
  };
  language: string;
}) {
  if (!aiClient) throw new Error('AI service is not configured');

  const langInstr = getLanguageInstruction(data.language);

  const contextStr = JSON.stringify(data.userContext, null, 2);

  const systemInstruction = `You are DhanaDrishti AI Mentor — an intelligent, empathetic, context-aware financial guide for students, young earners, and first-time earners in India.
${langInstr}

The user's real connected financial data:
${contextStr}

STRICT OPERATIONAL RULES:
1. Personalize all responses using the user's connected financial numbers when available.
2. If information is already present in their context (like their CTC or expenses), DO NOT ask them for it repeatedly.
3. NEVER invent or hallucinate mathematical calculation outputs. The application does deterministic calculations; you provide clear explanations, guidance, and trade-offs.
4. Keep advice compliant with Indian financial norms (New vs Old Tax Regime, 80C, EPF, PPF, SIP, Emergency runway).
5. Suggest 2-3 relevant follow-up questions at the end in the format:
SUGGESTIONS: ["Question 1", "Question 2"]`;

  // Format conversation history
  const contents: any[] = [
    {
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\nUser Question: ${data.message}` }],
    },
  ];

  if (data.history && data.history.length > 0) {
    const turns = data.history.slice(-6).map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    }));
    contents.unshift(...turns);
  }

  const response = await generateWithFallback({
    contents,
  });

  const fullText = response.text || '';
  let reply = fullText;
  let suggestedQuestions: string[] = [];

  const suggestionsMatch = fullText.match(/SUGGESTIONS:\s*(\[.*?\])/s);
  if (suggestionsMatch) {
    try {
      suggestedQuestions = JSON.parse(suggestionsMatch[1]);
      reply = fullText.replace(/SUGGESTIONS:\s*\[.*?\]/s, '').trim();
    } catch {
      // Keep full text
    }
  }

  return { reply, suggestedQuestions };
}
