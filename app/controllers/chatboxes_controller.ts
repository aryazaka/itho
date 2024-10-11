import type { HttpContext } from '@adonisjs/core/http'
import { marked } from 'marked';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default class ChatboxesController {
  /**
   * Display a list of resource
   */
  async index({view, request, response}: HttpContext) {

    return view.render('chatbox/index')
  }
  
  async proses({request, response}: HttpContext){
    const userMessage = request.input('message');

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      });

      const result = completion.choices[0].message.content?.trim()
      const markedResult =  marked(result!)

      return response.json({
        reply: markedResult,
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