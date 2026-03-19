import { generateTravelItinerary } from './src/services/agent/travelAgent.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const testTravelAgent = async () => {
    const destination = 'Paris, France';
    const days = 3;
    const budgetType = 'Moderate';
    const interests = ['Art', 'Cuisine', 'History'];

    console.log(`--- Starting Test for ${destination} ---`);
    console.log(`Days: ${days}, Budget: ${budgetType}, Interests: ${interests.join(', ')}`);

    try {
        const itinerary = await generateTravelItinerary(destination, days, budgetType, interests);
        console.log('\n--- Itinerary Successfully Generated ---');
        console.log(JSON.stringify(itinerary, null, 2));
    } catch (error) {
        console.error('\n--- Test Failed ---');
        console.error('Error message:', error.message);
        if (error.message.includes('404')) {
            console.error('Check ZAI_API_URL and the endpoint suffix (/chat/completions).');
        }
        process.exit(1);
    }
};

testTravelAgent();
