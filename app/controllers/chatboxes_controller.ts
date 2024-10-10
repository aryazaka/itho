import type { HttpContext } from '@adonisjs/core/http'
import { config } from "dotenv"
config()
import { GoogleGenerativeAI } from "@google/generative-ai"
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export default class ChatboxesController {
  /**
   * Display a list of resource
   */
  async index({view, request, response}: HttpContext) {

    const data = request.all()

    let input = data.prompt  
    if (input == undefined){
        input = "repeat my word 'Please fill the question for the result'"
    }
    console.log(input)
    try {
      const result = await model.generateContent(input);

      if (!result || !result.response || !result.response.text) {
          throw new Error("Invalid response structure");
      }

      return view.render('chatbox/index', {
          hasil: result.response.text(),
      });
  } catch (error) {
      console.error("Error generating content:", error.message);
      return view.render('chatbox/index', {
          hasil: "An error occurred while generating content.",
      });
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