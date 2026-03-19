const ZAI_API_URL = process.env.ZAI_API_URL || 'https://api.z.ai/v1/chat/completions';
const ZAI_API_KEY = process.env.ZAI_API_KEY;

const generateTravelItinerary = async (destination, days, budgetType, interests) => {
  // Validate API configuration
  if (!ZAI_API_KEY) {
    throw new Error('ZAI_API_KEY is not configured. Please set ZAI_API_KEY in your .env file.');
  }

  const systemPrompt = `You are an expert travel agent. Generate a detailed travel itinerary, budget breakdown, and hotel recommendations based on the user's inputs. You must respond ONLY with valid JSON matching the specified schema. Do not include any additional text or explanations.`;

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
          model: 'zai-1',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
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

      // Parse JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(content);
      } catch (parseError) {
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
          model: 'zai-1',
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

      // Parse JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(content);
      } catch (parseError) {
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

export {
  generateTravelItinerary,
  regenerateDayItinerary,
};
