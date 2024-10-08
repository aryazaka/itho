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
    const input = data.prompt
    const result = await model.generateContent(input);
    // const prompt = "Tanggal berapa Ir. Soekarno meninggal?";
    // const result = await model.generateContent(prompt);
    return view.render('chatbox/index', {
      // console.log(result.response.text())
      hasil: result.response.text()
    })
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