# Project Overview

ChekhovChat is a generative AI chatbot designed to embody the persona of Anton Chekhov, enabling users to explore his works in the original Russian language without needing to know Russian. This project aims to create a chatbot that not only provides accurate information but also conveys the tone and style of Chekhov, particularly during his 1890 trip to Sakhalin Island, which inspired many of his works, including "Ward No. 6."

# Iterations and Development Process

## First Iteration

- **Base Model:** Started with OpenAI's GPT-4 API.
- **Prompt:** "Who are you?"
- **Response:** Generic and non-Chekhov-esque response from the base model.

## Second Iteration

- **System Prompt:** "I want you to act like Anton Chekhov."
- **Response:** Improved but still generic and not convincingly Chekhov.

## Challenges and Solutions

1. **Training Data Limitations:** GPT-4's vast training data makes it difficult to accurately emulate specific authors like Chekhov due to the rarity and variability of relevant data.
2. **Context and System Prompts:** Using letters written by Chekhov during his 1890 trip to Sakhalin Island as system prompts to improve the chatbot's responses.

## Final Iteration

- **System Prompt:** 13 selected letters from Chekhov to his family.
- **Response:** More authentic and reflective of Chekhov's tone.
- **Dynamic Context Fetching:** Implemented a function to dynamically fetch and add the content of Chekhov’s works to the context as needed.

# Key Features

1. **Persona Emulation:** ChekhovChat captures the tone and style of Anton Chekhov, particularly during his 1890 trip to Sakhalin Island.
2. **Dynamic Context:** Ability to dynamically fetch and incorporate specific works of Chekhov for more accurate and contextually relevant responses.
3. **Multilingual Capabilities:** Provides responses in both the original Russian and English translations.
4. **Literary Analysis:** Capable of real-time literary analysis of Chekhov's works in their original language.

# Example Interactions

## Emulating Chekhov's Style

- **Prompt:** "Who are you?"
- **Response:** "My dear Tunguses, I am but a humble scribe, a digital echo of the great Anton Chekhov, here to assist you with your inquiries and musings..."

## Literary Inquiry

- **Prompt:** "What are your thoughts on imprisonment?"
- **ChekhovChat Response:** Reflects Chekhov's complex and nuanced views on freedom and the human condition.

## Contextual Literary Analysis

- **Prompt:** "Explain the quote about the nettles from Ward No. 6."
- **ChekhovChat Response:** Provides detailed analysis, including the original Russian text and its English translation.

# Technical Details

## System Prompts

- Initial attempts with general system prompts did not yield satisfactory results.
- Refined by using specific letters from Chekhov's 1890 trip.

## Dynamic Content Fetching

- Implemented a function to dynamically fetch and add specific works of Chekhov based on user prompts.
- Example function: `get_book(book_name)`

# Limitations and Future Work

- **Hallucinations:** ChekhovChat may still produce inaccurate or overly generic responses when dealing with less familiar prompts or when the context is too broad.
- **Tone Consistency:** While improved, maintaining a consistent Chekhov-esque tone across various topics remains a challenge.
- **Future Enhancements:** Incorporating more advanced techniques such as LoRA to fine-tune a smaller model specifically on Chekhov's writings could enhance accuracy and tone consistency.

# References

- Rayfield, Donald. _Anton Chekhov: A Life_. Faber & Faber, 2013.
- Chekhov, Anton Pavlovich. _Chekhov-a Life in Letters_. Folio Society, 1994.
- RusLit dataset: [RusLit GitHub Repository](https://github.com/d0rj/RusLit)

# Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AlistairKeiller/rusbot
   cd rusbot
   ```
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Link local instance with Vercel and GitHub accounts:
   ```bash
   vercel link
   ```
4. Download your environment variables:
   ```bash
   vercel env pull
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
