import { generateObject } from 'ai';
import { z } from 'zod';

const categorySchema = z.object({
  category: z.enum(['pothole', 'streetlight', 'garbage', 'water', 'sidewalk', 'vegetation', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  confidence: z.number().min(0).max(100),
  suggestedTitle: z.string(),
});

export async function POST(request: Request) {
  try {
    const { base64Image, description } = await request.json();

    if (!base64Image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Use Grok via Vercel AI Gateway
    const result = await generateObject({
      model: 'grok-3-vision',
      schema: categorySchema,
      prompt: `Analyze this civic infrastructure issue image and description.

Image: ${base64Image}
Description: ${description || 'No description provided'}

Categorize the issue and assess severity. Available categories:
- pothole: Road surface damage
- streetlight: Lighting issues
- garbage: Waste/trash problems
- water: Water leaks or flooding
- sidewalk: Pavement/pedestrian issues
- vegetation: Tree/plant overgrowth
- other: Other issues

Provide your assessment in the specified format.`,
    });

    return Response.json(result.object);
  } catch (error) {
    console.error('Categorization error:', error);
    return Response.json({ error: 'Failed to categorize image' }, { status: 500 });
  }
}
