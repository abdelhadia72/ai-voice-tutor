import fs from "fs";
import path from "path";

export function initAudioCache() {
  const cacheDir = path.join(process.cwd(), "public", "audio-cache");

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const gitignorePath = path.join(cacheDir, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, "*\n!.gitignore\n");
  }
}
