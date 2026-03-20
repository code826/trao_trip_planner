const generateTravelItinerary = async (destination, days, budgetType, interests) => {
  // Access environment variables inside function to ensure dotenv is loaded
  // Coding Plan endpoint: https://api.z.ai/api/coding/paas/v4/chat/completions
  const ZAI_BASE_URL = process.env.ZAI_API_URL || 'https://api.z.ai/api/coding/paas/v4';
  const ZAI_API_URL = `${ZAI_BASE_URL.replace(/\/$/, '')}/chat/completions`;
  const ZAI_API_KEY = process.env.ZAI_API_KEY;

  // Validate API configuration
  if (!ZAI_API_KEY) {
    throw new Error('ZAI_API_KEY is not configured. Please set ZAI_API_KEY in your .env file.');
  }

  const systemPrompt = `You are an expert travel agent. Generate a detailed but concise travel itinerary, budget breakdown, and hotel recommendations based on the user's inputs. You must respond ONLY with valid JSON matching the specified schema. Do not include any additional text or explanations.`;

  const userPrompt = `Create a ${days}-day trip to ${destination} with a ${budgetType} budget. Interests: ${interests.join(', ')}.

Return a JSON object with the following structure:
{
  "itinerary": [
    {
      "dayNumber": 1,
      "theme": "string",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "string",
          "description": "string",
          "estimatedCost": 0
        }
      ]
    }
  ],
  "budget": {
    "breakdown": [
      {
        "category": "string",
        "estimatedCost": 0
      }
    ],
    "totalEstimatedCost": 0,
    "currency": "USD"
  },
  "hotels": [
    {
      "name": "string",
      "rating": 4.5,
      "pricePerNight": 0,
      "description": "string",
      "bookingUrl": "optional string"
    }
  ]
}`;

  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(ZAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'GLM-4.7',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        throw new Error(`Z.AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from Z.AI API');
      }

      // Parse JSON response - handle possible markdown block wrapping
      let parsedResponse;
      try {
        const cleanContent = content.replace(/```json\n?|```/g, '').trim();
        parsedResponse = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Raw content that failed parsing:', content);
        throw new Error('Invalid JSON response from Z.AI API');
      }

      // Validate response structure
      if (!parsedResponse.itinerary || !Array.isArray(parsedResponse.itinerary)) {
        throw new Error('Invalid response structure: missing or invalid itinerary');
      }

      if (!parsedResponse.budget || !parsedResponse.budget.breakdown) {
        throw new Error('Invalid response structure: missing or invalid budget');
      }

      if (!parsedResponse.hotels || !Array.isArray(parsedResponse.hotels)) {
        throw new Error('Invalid response structure: missing or invalid hotels');
      }

      return parsedResponse;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // Exponential backoff: 1s, 2s, 4s
      const backoffTime = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }

  throw new Error(`Failed to generate itinerary after ${maxRetries} attempts: ${lastError.message}`);
};

const regenerateDayItinerary = async (destination, budgetType, interests, previousDays, dayNumber) => {
  // Coding Plan endpoint: https://api.z.ai/api/coding/paas/v4/chat/completions
  const ZAI_BASE_URL = process.env.ZAI_API_URL || 'https://api.z.ai/api/coding/paas/v4';
  const ZAI_API_URL = `${ZAI_BASE_URL.replace(/\/$/, '')}/chat/completions`;
  const ZAI_API_KEY = process.env.ZAI_API_KEY;

  // Validate API configuration
  if (!ZAI_API_KEY) {
    throw new Error('ZAI_API_KEY is not configured. Please set ZAI_API_KEY in your .env file.');
  }

  const systemPrompt = `You are an expert travel agent. Generate a detailed single-day travel itinerary based on the user's inputs and previous days' context. You must respond ONLY with valid JSON matching the specified schema. Do not include any additional text or explanations. Avoid duplicating activities from previous days.`;

  const previousActivities = previousDays.map(day =>
    day.activities.map(act => act.title).join(', ')
  ).join(' | ');

  const userPrompt = `Regenerate day ${dayNumber} of a trip to ${destination} with a ${budgetType} budget. Interests: ${interests.join(', ')}.

Previous days' activities (DO NOT repeat these): ${previousActivities || 'None'}

Return a JSON object with the following structure:
{
  "dayNumber": ${dayNumber},
  "theme": "string",
  "activities": [
    {
      "time": "09:00 AM",
      "title": "string",
      "description": "string",
      "estimatedCost": 0
    }
  ]
}`;

  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(ZAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'GLM-4.7',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Z.AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from Z.AI API');
      }

      // Parse JSON response - handle possible markdown block wrapping
      let parsedResponse;
      try {
        const cleanContent = content.replace(/```json\n?|```/g, '').trim();
        parsedResponse = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Raw content that failed parsing (regenerate):', content);
        throw new Error('Invalid JSON response from Z.AI API');
      }

      // Validate response structure
      if (!parsedResponse.activities || !Array.isArray(parsedResponse.activities)) {
        throw new Error('Invalid response structure: missing or invalid activities');
      }

      if (!parsedResponse.theme) {
        throw new Error('Invalid response structure: missing theme');
      }

      return parsedResponse;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // Exponential backoff
      const backoffTime = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }

  throw new Error(`Failed to regenerate day after ${maxRetries} attempts: ${lastError.message}`);
};

// Helper: strip MongoDB internal fields (_id, __v) from objects before sending to AI
const stripMongoFields = (obj) => {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (key === '_id' || key === '__v') return undefined;
    return value;
  }));
};

// Helper: attempt to recover truncated JSON by closing open brackets/braces
const tryRecoverTruncatedJSON = (text) => {
  let cleaned = text.trim();
  // Remove trailing incomplete string (cut-off mid-value)
  cleaned = cleaned.replace(/,\s*"[^"]*$/s, '');
  cleaned = cleaned.replace(/,\s*$/s, '');
  // Count open vs close brackets
  const opens = { '{': 0, '[': 0 };
  for (const ch of cleaned) {
    if (ch === '{') opens['{']++;
    if (ch === '}') opens['{']--;
    if (ch === '[') opens['[']++;
    if (ch === ']') opens['[']--;
  }
  // Close any remaining open brackets/braces
  while (opens['['] > 0) { cleaned += ']'; opens['[']--; }
  while (opens['{'] > 0) { cleaned += '}'; opens['{']--; }
  return cleaned;
};

const updateItinerary = async (trip, userRequest) => {
  const ZAI_BASE_URL = process.env.ZAI_API_URL || 'https://api.z.ai/api/coding/paas/v4';
  const ZAI_API_URL = `${ZAI_BASE_URL.replace(/\/$/, '')}/chat/completions`;
  const ZAI_API_KEY = process.env.ZAI_API_KEY;

  if (!ZAI_API_KEY) {
    throw new Error('ZAI_API_KEY is not configured.');
  }

  // Strip MongoDB fields to reduce token usage
  const cleanItinerary = stripMongoFields(trip.itinerary);
  const cleanBudget = stripMongoFields(trip.budget);
  const cleanHotels = stripMongoFields(trip.hotels);

  const systemPrompt = `You are an expert travel agent helping a user refine their existing travel itinerary.
Update the given itinerary based on the user request.

Rules:
- Make minimal changes only
- Do not rewrite entire itinerary unless explicitly asked (e.g. "shorten to 3 days")
- Keep the same JSON structure
- Modify only relevant days/activities
- Ensure logical travel flow
- If user asks to change number of days, add or remove days accordingly and update the days count
- Recalculate budget breakdown and total to reflect any changes
- Keep activity descriptions SHORT (max 15 words each) to avoid response truncation
- Do NOT include _id, __v, or any MongoDB fields

Respond ONLY with valid JSON. No markdown, no extra text, no explanations.`;

  const userPrompt = `Trip: ${trip.destination}, ${trip.days} days, ${trip.budgetType} budget, interests: ${trip.interests.join(', ')}

Current itinerary:
${JSON.stringify(cleanItinerary)}

Current budget:
${JSON.stringify(cleanBudget)}

Current hotels:
${JSON.stringify(cleanHotels)}

User request: "${userRequest}"

Return ONLY a JSON object with this structure:
{"days":<number>,"itinerary":[{"dayNumber":1,"theme":"string","activities":[{"time":"09:00 AM","title":"string","description":"short string","estimatedCost":0}]}],"budget":{"breakdown":[{"category":"string","estimatedCost":0}],"totalEstimatedCost":0,"currency":"USD"},"hotels":[{"name":"string","rating":4.5,"pricePerNight":0,"description":"short string"}]}`;

  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(ZAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ZAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'GLM-4.7',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.5,
          max_tokens: 8192,
        }),
      });

      if (!response.ok) {
        throw new Error(`Z.AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      const finishReason = data.choices?.[0]?.finish_reason;

      if (!content) {
        throw new Error('Empty response from Z.AI API');
      }

      // Strip markdown wrapping if present
      let cleanContent = content.replace(/```json\n?|```/g, '').trim();

      // If response was truncated (finish_reason === 'length'), try to recover
      if (finishReason === 'length') {
        console.warn('AI response was truncated (finish_reason: length). Attempting recovery...');
        cleanContent = tryRecoverTruncatedJSON(cleanContent);
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanContent);
      } catch (parseError) {
        // Second recovery attempt for any parse failure
        try {
          const recovered = tryRecoverTruncatedJSON(cleanContent);
          parsedResponse = JSON.parse(recovered);
          console.log('Successfully recovered truncated JSON response.');
        } catch (recoveryError) {
          console.error('Raw content that failed parsing (update):', content);
          throw new Error('Invalid JSON response from Z.AI API');
        }
      }

      // Check for failure response from AI
      if (parsedResponse.success === false) {
        throw new Error(parsedResponse.message || 'AI unable to update itinerary');
      }

      // Validate required fields
      if (!parsedResponse.itinerary || !Array.isArray(parsedResponse.itinerary)) {
        throw new Error('Invalid response structure: missing itinerary');
      }
      if (!parsedResponse.budget) {
        throw new Error('Invalid response structure: missing budget');
      }

      return parsedResponse;
    } catch (error) {
      lastError = error;
      console.error(`Update attempt ${attempt + 1} failed:`, error.message);
      if (error.cause) console.error('  Cause:', error.cause);
      const backoffTime = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }

  throw new Error(`Failed to update itinerary after ${maxRetries} attempts: ${lastError.message}`);
};

export {
  generateTravelItinerary,
  regenerateDayItinerary,
  updateItinerary,
};
