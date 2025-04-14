import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const routes = express.Router();

// POST route to handle content from the frontend
routes.post("/process-content", async (req, res) => {
  try {
    const { content } = req.body; 
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content, 
    });

    return res.status(200).json({ response: response.text || response }); 
  } catch (error) {
    console.error("Error processing content:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default routes;
