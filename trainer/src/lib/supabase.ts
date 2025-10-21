import { createClient } from "@supabase/supabase-js";

export interface DeployConfig {
  url: string;
  key: string;
  bucket: string;
}

export async function uploadModel(
  cfg: DeployConfig,
  path: string,
  blob: Blob
) {
  const client = createClient(cfg.url, cfg.key);
  const response = await client.storage
    .from(cfg.bucket)
    .upload(path, blob, { upsert: true });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}
