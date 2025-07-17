const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeResume(resumeText) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
Analyze the following resume and provide a comprehensive assessment. Return your response in valid JSON format with the following structure:

{
  "summary": "A 2-3 sentence professional summary of the candidate's background",
  "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "talkingPoints": ["point1", "point2", "point3", "point4", "point5"],
  "score": 85
}

Guidelines:
- Summary: Focus on their professional background, years of experience, and key areas of expertise
- Strengths: List 3-5 key strengths focusing on job readiness, leadership, technical skills, or communication. Be specific and highlight what makes them stand out
- Improvements: List 2-3 constructive improvement areas. Frame positively (e.g., "Consider expanding..." instead of "Lacks...")
- Talking Points: Provide 3-5 concise, conversational points suitable for a 60-second video pitch. Make them specific to this candidate
- Score: Assign a score between 75-100 based on presentation, clarity, and relevance. Never go below 75 - focus on encouragement

Resume content:
${resumeText}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert career coach and resume analyst. Provide constructive, encouraging feedback that helps candidates present their best selves. Always maintain a positive, professional tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid response format from OpenAI');
      }
    }

    // Validate response structure
    if (!analysis.summary || !analysis.strengths || !analysis.improvements || !analysis.talkingPoints || !analysis.score) {
      throw new Error('Incomplete analysis response');
    }

    // Ensure score is within range
    if (analysis.score < 75) {
      analysis.score = 75;
    } else if (analysis.score > 100) {
      analysis.score = 100;
    }

    // Ensure arrays have the right length
    analysis.strengths = analysis.strengths.slice(0, 5);
    analysis.improvements = analysis.improvements.slice(0, 3);
    analysis.talkingPoints = analysis.talkingPoints.slice(0, 5);

    return analysis;

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please try again later.');
    } else if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key configuration.');
    } else {
      throw new Error('Failed to analyze resume with AI. Please try again.');
    }
  }
}

module.exports = { analyzeResume };