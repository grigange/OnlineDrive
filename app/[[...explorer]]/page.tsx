import FileExplorer from "@/app/components/FileExplorer";
import React, { Suspense } from "react";
import FileGrid from "@/app/components/FileGrid";
import { FileElement } from "@/app/types";
import { getFileInfo } from "../FileHandler";

export default async function Home({ params }: { params: { explorer?: string[] } }) {
  const rest_path = params?.explorer?.join("/") ?? "";
  const folderPath = "public/My Drive/" + rest_path;
  const files:FileElement = {
    name: "My Drive",
    path: folderPath,
    size: 0,
    ext: "",
    group: "folder",
    isFolder: true,
    modified: new Date(),
    children: await getFileInfo(folderPath),
  };

  return (
      <FileGrid file={files} />
  );
}
