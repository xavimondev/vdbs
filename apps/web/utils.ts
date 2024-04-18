type SupportedImageTypes =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp";

export const isSupportedImageType = (
  type: string
): type is SupportedImageTypes => {
  return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(type);
};

export const toBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const copyToClipboard = async (content: string) => {
  if (navigator.clipboard) navigator.clipboard.writeText(content);
};
