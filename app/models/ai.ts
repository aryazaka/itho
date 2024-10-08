import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { config } from "dotenv"
config()
import { GoogleGenerativeAI } from "@google/generative-ai"
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Tanggal berapa Ir. Soekarno meninggal?";
const result = await model.generateContent(prompt);

console.log(result.response.text())

export default class Ai extends BaseModel {

}