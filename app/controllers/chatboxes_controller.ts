import type { HttpContext } from '@adonisjs/core/http'
import { marked } from 'marked';
import app from '@adonisjs/core/services/app'
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});



export default class ChatboxesController {

  // private fileManager: GoogleAIFileManager;
  // private genAI: GoogleGenerativeAI;

  //   constructor() {
  //       this.fileManager = new GoogleAIFileManager(process.env.API_KEY!);
  //       this.genAI = new GoogleGenerativeAI(process.env.API_KEY!);
  //   }

    // async uploadFile({ request, response }: HttpContext){
    //     const file = request.file('image'); // Pastikan input form memiliki name="image"
        
    //     if (!file) {
    //       return response.badRequest('No file uploaded');
    //   }

    //   if (!file.isValid) {
    //       return response.badRequest('Invalid file');
    //   }

    //   // Simpan file ke folder uploads
    //   await file.move('uploads', {
    //       name: file.clientName, // Nama asli file
    //       overwrite: true, // Jika ingin menimpa file dengan nama yang sama
    //   });

    // }

  async index({view, request, session}: HttpContext) {
    const username = session.get('username');

    return view.render('chatbox/index', {
      title: 'ChatBot',
      username
    })

  }

  async proses({request, response}: HttpContext){
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
        max_completion_tokens: 128,
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

      console.log(inputText)

      return response.json({
        replyText: markedResult,
        replyImg: image_url,
      });
      // const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // const result = await model.generateContent(inputText);
      // const markedResult = marked(result.response.text());

      // return response.json({
      //   replyText: markedResult,
      //   // replyImg: image_url,
      // });
    }catch (error) {
      return response.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  }

  async upload({request, response}: HttpContext){
    const image = request.file('image');
    console.log('Image:', image); // Cek apa yang diterima

    if (!image) {
      return response.status(400).send('No file uploaded'); // Mengembalikan error jika tidak ada file
  }

  // Menentukan nama file dan lokasi penyimpanan
  const fileName = `${new Date().getTime()}.${image.extname}`; // Menggunakan timestamp untuk nama file
  await image.move('storage/uploads', {
      name: fileName,
      overwrite: true
  });

  // Mengembalikan respons sukses
  return response.json({
    imageName: fileName
  })
}
  
  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ response }: HttpContext) {
   
  }

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