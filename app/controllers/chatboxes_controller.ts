import type { HttpContext } from '@adonisjs/core/http'
import { marked } from 'marked';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export default class ChatboxesController {
  /**
   * Display a list of resource
   */
  async index({view, session}: HttpContext) {
    const username = session.get('username');
    return view.render('chatbox/index', {
      title: 'ChatBot',
      username
    })
  }

  async proses({request, response}: HttpContext){
    // const userMessage = request.input('message');
    const inputText = request.input('message');

    try {
      const completion = await openai.chat.completions.create({
        model: 'chatgpt-4o-latest',
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": `
                  You are a helpful assistant.
                `
              }
            ]
          }, {"role": "user", "content": inputText},
        ],
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_completion_tokens: 256,
        stop: ["user:", "AI:","user:", "AI:"],
      });

      const responseImg = await openai.images.generate({
        model: "dall-e-3",
        prompt: inputText,
        n: 1,
        size: "1024x1024",
      });
      const image_url = responseImg.data[0].url;
    
      const result = completion.choices[0].message.content
      const markedResult =  marked(result!)

      return response.json({
        replyText: markedResult,
        replyImg: image_url,
      });
    }catch (error) {
      return response.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  }
  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}