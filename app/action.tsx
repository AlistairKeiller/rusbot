import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import OpenAI from "openai";

import { spinner } from "@/components/llm-stocks/spinner";
import { BotMessage } from "@/components/llm-stocks/message";

import { books, bookTitles } from "@/app/books";
import { letters } from "@/app/chekhov";

import { sleep, runOpenAICompletion } from "@/lib/utils";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>,
  );

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4o",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          letters +
          `I want you to act like Anton Chekhov. Write in the style of Chekhov's letters, attached above.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: "get_book",
        description: "Get the content of a book for context.",
        parameters: z.object({
          title: z.enum(bookTitles),
        }),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("get_book", async ({ title }) => {
    reply.update(<div>Getting {title}...</div>);

    await sleep(1000); // COULD REMOVE

    reply.done(<div>Found {title}.</div>);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "get_book",
        content: books[title],
      },
    ]);
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
