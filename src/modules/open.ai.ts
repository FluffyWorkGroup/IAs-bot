import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
import axios from "axios";
import supabase from "./supabase.js";

async function dalle(prompt, number) {
  let response = await axios({
    method: "post",
    url: "https://api.pawan.krd/v1/images/generations",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PAWAN_KEY}`,
    },
    data: JSON.stringify({
      n: number,
      prompt: prompt,
      size: "512x512",
    }),
  });
  response = response.data;
  var imagesArr = response.data.map((d, i) => {
    return { attachment: d.url, name: `result-${i}.png` };
  });
  const { data, error } = await supabase
    .from("results")
    .insert([
      { prompt: prompt, provider: "dall-e 2", result: imagesArr, uses: 1 },
    ]);
  return imagesArr;
}

export { dalle };
