import crypto from "node:crypto";

import { env } from "@/lib/env";

const algorithm = "aes-256-gcm";

function getKey() {
  const raw = env.TOKEN_ENCRYPTION_KEY;
  const base64 = Buffer.from(raw, "base64");

  if (base64.length === 32) {
    return base64;
  }

  return crypto.createHash("sha256").update(raw).digest();
}

export function encryptToken(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(".");
}

export function decryptToken(value: string) {
  const [ivValue, authTagValue, encryptedValue] = value.split(".");

  if (!ivValue || !authTagValue || !encryptedValue) {
    throw new Error("Invalid encrypted token format.");
  }

  const decipher = crypto.createDecipheriv(algorithm, getKey(), Buffer.from(ivValue, "base64"));
  decipher.setAuthTag(Buffer.from(authTagValue, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64")),
    decipher.final()
  ]).toString("utf8");
}
