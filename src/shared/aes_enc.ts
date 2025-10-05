import { AES, enc } from "crypto-js";

export const aesEncrypter = (val: string) => {
     const response = AES.encrypt(val, process.env.NEXT_PUBLIC_CRYPTO_SECRET || "");
     return response.toString();
};

export const aesDecrypter = (val: string) => {
     const response = AES.decrypt(val, process.env.NEXT_PUBLIC_CRYPTO_SECRET || "");
     return response.toString(enc.Utf8);
};
