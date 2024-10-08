import type { HttpContext } from '@adonisjs/core/http'
import { config } from "dotenv"
config()
import { GoogleGenerativeAI } from "@google/generative-ai"
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Tanggal berapa Ir. Soekarno meninggal?";

const result = await model.generateContent(prompt);

export default class HomeController {
  /**
   * Display a list of resource
   */
  async index({view}: HttpContext) {
    return view.render('pages/home', [
      console.log(result.response.text())
    ])
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
  async show({ params }: HttpContext) {}

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