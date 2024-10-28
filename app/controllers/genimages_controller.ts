import type { HttpContext } from '@adonisjs/core/http'
import fetch from 'node-fetch';

export default class GenimagesController {
  public async generateImage({ request, response }: HttpContext) {
    const { inputs } = request.input('message');

    try {
        const result = await this.query({ inputs });
        // response.headers({'Content-Type': 'image/png'});
        console.log(result)
        return response.json({
          replyImg: result,
        });
    } catch (error) {
        return response.status(500).send({ message: 'Error generating image', error: error.message });
    }
}

private async query(data: { inputs: string }) {
    const response = await fetch("https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image", {
        headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }

    // const result = await response.buffer(); // Use buffer instead of blob for Node.js
    // return result;
}
}