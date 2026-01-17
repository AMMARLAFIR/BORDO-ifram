# 📘 Bordo Education Translator

## Overview

**Bordo Education** is an **imaginary education platform** that demonstrates how official documentation sites (such as Ordino) can be translated into local languages like **Sinhala** and **Tamil**. The project uses an **iframe-based integration** to embed international education and documentation sites directly into the platform, with translations applied inside the iframe. This allows learners to view the original content while experiencing it in their native language.
This project is **vibe coded** — a conceptual prototype built to explore possibilities rather than a production-ready solution.

## ✨ Purpose
The goal is to:
- Provide local students with access to **original documentation and guides** in their native language.
- Reduce the language barrier in IT and education.
- Inspire future projects that make global knowledge more inclusive.

## 🚀 Features (Conceptual)
- Translation of official documentation sites into Sinhala and Tamil.
- Preservation of original structure and formatting.
- Demonstration of how localized education platforms could look and function.

## ⚠️ Limitations
- This is **not a production system** — it’s a prototype idea.
- Currently built without Google Translation APIs, which makes translation slower and less automated.
- Performance depends on manual or alternative translation methods.

## 🛠️ Tech Notes
**Iframe Embedding:** International documentation sites are displayed inside an iframe within the Bordo Education platform. - **Translation Layer:** Content inside the iframe is translated into Sinhala and Tamil. - **No Google APIs:** The project currently does not use Google Translation APIs, which makes translation slower and less automated. - Future improvements could integrate Microsoft Translator API, Hugging Face multilingual models, or other open-source solutions. ## 🚀 Features (Conceptual) - Seamless embedding of external educational/documentation sites. - Localized translations inside the iframe. - Preservation of original site structure and formatting.
- Built with **VIBE code** (experimental approach).
- Repository demonstrates the concept rather than a fully working product.
- Future implementations could integrate:
  - Google Translation API
  - Microsoft Translator API
  - Open-source NLP libraries (e.g., Hugging Face Transformers)

## 📚 Why It Matters
Students in regions where English is not the primary language often struggle to access technical documentation.  
By translating platforms like Ordino into Sinhala and Tamil, **Bordo Education** imagines a world where:
- Learning is more inclusive.
- Students can grow their IT and academic skills without language barriers.
- Local communities can contribute to global knowledge.

## 🤝 Contributing
Since this is a conceptual project, contributions can include:
- Ideas for improving translation workflows.
- Suggestions for open-source translation tools.
- Feedback on how to make localized education platforms more effective.

## 📄 License
MIT License — free to use, adapt, and share.

---

> ⚠️ **Note:** This repository is a **conceptual demo**. It is not intended for production use, but rather to showcase the idea of localized education platforms.


<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/16WFNmE84GS8kPmb9ghWZ6Fuk_TexM0GT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
