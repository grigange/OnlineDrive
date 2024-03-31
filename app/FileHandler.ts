"use server";
import * as fs from "fs";
import path from "path";
import { promisify } from "util";
import { GroupType,FileElement } from "@/app/types";
import { getExtensionGroup, getFileExtension } from "./files";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export async function getFileInfo(folderPath: string): Promise<FileElement[]> {
  try {
    const files = await readdir(folderPath, {
      withFileTypes: true,
    });
    const fileInfo: FileElement[] = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(file.path, file.name);
        const stats = await stat(filePath);
        const ext = getFileExtension(file.name);
        return {
          name: file.name,
          path: filePath,
          size: stats.size,
          ext: ext,
          group: getExtensionGroup(ext) as GroupType,
          isFolder: stats.isDirectory(),
          modified: stats.mtime,
          children: stats.isDirectory()
            ? [...(await getFileInfo(filePath))]
            : [],
        };
      })
    );
    return fileInfo;
  } catch (error) {
    return [];
  }
}

const createFile = async (formData: FormData,path:string) => {
    "use server";
    const rawFormData = {
      fileName: formData.get("fileName") ?? "blank",
      fileExtension: formData.get("extension") ?? "",
    };
    const content = "Hello World";
    fs.writeFile(
      `public/My Drive/${rawFormData.fileName}${rawFormData.fileExtension}`,
      content,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    console.log()
  };