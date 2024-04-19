import fetch from "node-fetch";

const ENDPOINT = `http://localhost:3000/api/get-generation?code=`;

type DataResponse = { data?: string; error?: string };

export const getSchema = async ({
  generationCode,
}: {
  generationCode: string;
}): Promise<DataResponse> => {
  try {
    const response = await fetch(`${ENDPOINT}${generationCode}`);
    const data = (await response.json()) as DataResponse;
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: "An error has ocurred.",
    };
  }
};
