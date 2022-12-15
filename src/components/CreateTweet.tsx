import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string()
    .min(10, "Tweet must be at least 10 characters long")
    .max(280, "Tweet must be at most 280 characters long"),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (e) {
      setError(e.message);
      return;
    }

    if (text.length < 10) {
      setError("Tweet must be at least 10 characters long");
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <form
        className="mb-4 flex w-full flex-col rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full p-4 shadow"
          title="setText"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button className="bg-primary px-4 py-2 text-white rounded-md" type="submit">Tweet</button>
        </div>
      </form>
    </>
  );
}
