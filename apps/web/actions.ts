"use server";

import { Redis } from "@upstash/redis";

export const saveGeneration = async (data: {
  sqlSchema: string;
  cmdCode: string;
}) => {
  const { cmdCode, sqlSchema } = data;
  const redis = Redis.fromEnv();
  const res = await redis.set(cmdCode, sqlSchema);
  return res;
};
