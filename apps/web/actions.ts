"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

export const saveGeneration = async (data: {
  sqlSchema: string;
  cmdCode: string;
}) => {
  const { cmdCode, sqlSchema } = data;
  const redis = Redis.fromEnv();
  const res = await redis.set(cmdCode, sqlSchema);
  return res;
};

export const setApiKey = (formData: FormData) => {
  const apiKey = formData.get("key") as string;
  cookies().set("api-key", apiKey, {
    secure: true,
  });
};

export const getApiKey = async () => {
  return cookies().get("api-key")?.value;
};
