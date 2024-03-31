"use client";
import React, { Suspense, useState } from "react";
import { getGroupColor } from "../files";
import { FileIcon, IconType } from "react-file-icon";
import Image from "next/image";
import folderSVG from "@/public/folder.svg";
import {
  normalizeDownloadLink,
  normalizeImageSrc,
  normalizeLinkPath,
  prettifyBytes,
} from "../utils";
import { FileElement } from "../types";
import Link from "next/link";
import { VscAdd } from "react-icons/vsc";
import Breadcrumbs from "./Breadcrumbs";

const FileGrid = ({ file }: { file: FileElement }) => {
  return (
    <div className="flex flex-1 gap-4 flex-col w-5/6 h-full relative">
      <Breadcrumbs path={file.path} />
      <div className="justify-items-center place-content-start h-full relative gap-2 grid grid-cols-auto-fill-120 lg:grid-cols-auto-fill-150 p-2 overflow-y-auto pt-16  lg:pt-16  lg:p-4">
        <GridAdd />
        {file.children.map((e) => (
          <Suspense key={e.name} fallback={<GridLoadingElement />}>
            {e.isFolder ? (
              <GridFolderElement element={e} />
            ) : (
              <GridFileElement element={e} />
            )}
          </Suspense>
        ))}
      </div>
    </div>
  );
};



const GridAdd = () => {
  return (
    <form className="group flex items-center justify-center hover:cursor-pointer aspect-square w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] bg-zinc-900/50 rounded-xl">
      <VscAdd size={42} color="white" className=" transition-colors group-hover:fill-lime-600"/>
    </form>
  );
};
const GridLoadingElement = () => {
  return (
    <div className="aspect-square w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] bg-zinc-900/50 rounded-xl animate-pulse"></div>
  );
};

const GridFolderElement = async ({
  element,
}: //callback,
{
  element: FileElement;
  //callback: React.Dispatch<React.SetStateAction<FileElement>>;
}) => {
  return (
    <Link
      href={normalizeLinkPath(element.path)}
      className="flex-col items-center justify-evenly inline-flex p-2 bg-zinc-900 rounded-xl aspect-square w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] hover:ring-2 ring-lime-600 hover:cursor-pointer"
    >
      <div className="object-contain justify-center flex items-center w-[85px] h-[85px] relative flex-1">
        <Image
          src={folderSVG}
          width={45}
          height={45}
          alt="folder icon"
          priority
        />
      </div>
      <div className="flex flex-col items-center w-full mt-2">
        <span className="w-full text-nowrap text-sm text-ellipsis overflow-hidden text-zinc-200 text-center">
          {element.name}
        </span>
        <span className="text-xs text-zinc-300">
          {prettifyBytes(element.size)}
        </span>
      </div>
    </Link>
  );
};
const GridFileElement = async ({ element }: { element: FileElement }) => {
  return (
    <a
      href={normalizeDownloadLink(element.path)}
      download
      className="flex-col items-center justify-evenly inline-flex p-2 bg-zinc-900 rounded-xl aspect-square w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] hover:ring-2 ring-lime-600 hover:cursor-pointer"
    >
      {element.group == "image" ? (
        <div className="object-contain flex items-center max-w-[142px] w-full h-full flex-1 relative overflow-hidden rounded">
          <Image
            src={normalizeImageSrc(element.path)}
            className="w-full h-full"
            quality={10}
            fill
            objectFit="contain"
            priority={false}
            alt={element.group}
          />
        </div>
      ) : (
        <figure className="object-contain justify-center flex items-center w-[45px] h-[45px] m-auto">
          <FileIcon
            extension={element.ext}
            type={element.group as IconType}
            color={getGroupColor(element.group)}
            labelColor="#353535"
          />
        </figure>
      )}
      <div className="flex flex-col items-center w-full mt-2">
        <span className="w-full text-sm text-ellipsis text-nowrap overflow-hidden text-zinc-200  text-center">
          {element.name}
        </span>
        <span className="text-xs text-zinc-300">
          {prettifyBytes(element.size)}
        </span>
      </div>
    </a>
  );
};

export default FileGrid;
