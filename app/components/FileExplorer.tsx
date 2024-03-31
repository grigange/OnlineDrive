import Script from "next/script";
import { getFileInfo } from "../FileHandler";
import { FileElement } from "../types";
import FileExplorerRecursive from "./FileExplorerRecursive";

const FileExplorer = async () => {
  const folderPath = "public/My Drive/";
  const files: FileElement = {
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
    <div className="hidden flex-col w-1/2 max-w-[334px] bg-black h-full xl:flex border-r-2 border-zinc-600">
      <FileExplorerRecursive file={files} />
    </div>
  );
};

export default FileExplorer;
