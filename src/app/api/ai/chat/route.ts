import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, subject, role } = await req.json();

    const apiKey = process.env.AI_API_KEY;

    // Security Check: Never expose keys to client; If key is not configured, give informative guidance
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        isConfigured: false,
        message:
          'AI Assistant API Key is not configured on the server yet. Please add `AI_API_KEY` (e.g. Google Gemini or OpenAI key) into your `.env.local` file to enable live automated LLM responses. Below is an example structured response pattern.',
        demoResponse: `### Conceptual Explanation: ${prompt}
        
1. **Core Definition:** In ${subject || 'General Studies'}, this topic is built upon foundational first principles.
2. **Step-by-Step Breakdown:**
   - Step 1: Identify given variables and constraints.
   - Step 2: Formulate the governing equation or model.
   - Step 3: Verify boundary conditions and edge cases.
3. **Practice Question:** Try solving an inverse scenario where initial parameters are inverted.

*(This preview demonstrates the response schema. Configure AI_API_KEY in .env.local to activate live generative models.)*`,
      });
    }

    // When API key is configured, call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are EduCore AI, a kind, pedagogical, and rigorous educational tutor.
The user is a ${role || 'student'} asking about ${subject || 'their coursework'}.
Explain concepts step-by-step, provide intuitive analogies, and give a check-for-understanding practice question.
User question: "${prompt}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response returned from AI.';

    return NextResponse.json({
      success: true,
      isConfigured: true,
      response: text,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Error communicating with AI service',
      },
      { status: 500 }
    );
  }
}
