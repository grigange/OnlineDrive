"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FileIcon, IconType } from "react-file-icon";
import { normalizeDownloadLink } from "../utils";
import { getGroupColor } from "@/app/files";
import folder from "@/public/folder.svg";
import {
  VscArrowDown,
  VscBlank,
  VscChevronDown,
  VscChevronRight,
} from "react-icons/vsc";
import { FileElement } from "../types";

export default function FileExplorerRecursive({ file }: { file: FileElement }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="flex items-center p-2 gap-2 hover:bg-lime-600/20 hover:cursor-pointer"
        onClick={() => setOpen((c) => !c)}
        data-open={true}
      >
        {file.isFolder ? (
          open ? (
            <VscChevronDown />
          ) : (
            <VscChevronRight />
          )
        ) : (
          <VscBlank />
        )}
        {file.isFolder ? (
          <Image src={folder} width={14} height={14} alt="folder icon" />
        ) : (
          <figure className="w-4 h-6 flex items-center">
            <FileIcon
              extension={file.ext}
              type={file.group as IconType}
              color={getGroupColor(file.group)}
              labelColor="#353535"
            />
          </figure>
        )}
        <span className="w-full text-ellipsis overflow-hidden text-zinc-200">
          {file.name}
        </span>
        {!file.isFolder && (
          <a href={normalizeDownloadLink(file.path)} download={true}>
            <VscArrowDown />
          </a>
        )}
      </div>
      {file.isFolder && open && (
        <div className="flex flex-col ml-3 border-l-[1px] border-zinc-400 overflow-y-auto max-h-max">
          {file.children.map((f) => (
            <FileExplorerRecursive file={f} key={f.name} />
          ))}
          {file.children.length == 0 && (
            <i className="px-2 text-slate-300">empty</i>
          )}
        </div>
      )}
    </div>
  );
}