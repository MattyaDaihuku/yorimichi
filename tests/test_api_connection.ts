import { config } from 'dotenv';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

config({ path: '.env.local' });

async function runTest() {
    console.log("=== API Connection Test ===");
    console.log("1. Checking Environment variable NEXT_PUBLIC_TEMP_GOOGLE_API_KEY...");
    const apiKey = process.env.NEXT_PUBLIC_TEMP_GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("❌ NEXT_PUBLIC_TEMP_GOOGLE_API_KEY is not set.");
        process.exit(1);
    }
    console.log("✅ API Key found.");

    console.log("\n2. Initializing Vercel AI SDK Google provider...");
    try {
        const google = createGoogleGenerativeAI({ apiKey });
        const model = google('gemini-2.5-flash');
        
        console.log("3. Sending a test message: 'Hello, what is your name?'...");
        const result = streamText({
            model,
            messages: [{ role: 'user', content: 'Hello, what is your name? Please reply very shortly.' }],
        });

        console.log("Response stream started. Waiting for output...");
        for await (const textPart of result.textStream) {
            process.stdout.write(textPart);
        }
        console.log("\n\n✅ Stream completed successfully.");
    } catch (error) {
        console.error("\n❌ Failed to communicate with API:", error);
    }
}

runTest();
