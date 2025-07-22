import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiClientSingleton {
  private static instance: GoogleGenerativeAI | null = null
  private static model: any = null

  static getClient(): GoogleGenerativeAI {
    if (!this.instance) {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('Gemini API key not found. Please set GEMINI_API_KEY in .env file.')
      }
      this.instance = new GoogleGenerativeAI(apiKey)
    }
    return this.instance
  }

  static getModel() {
    if (!this.model) {
      const client = this.getClient()
      this.model = client.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    }
    return this.model
  }
}

export const getGeminiClient = () => GeminiClientSingleton.getClient()
export const getGeminiModel = () => GeminiClientSingleton.getModel()