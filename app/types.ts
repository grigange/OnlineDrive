
export type FileElement = {
    name: string,
    path: string,
    size: number,
    ext: string,
    group: GroupType,
    isFolder: boolean,
    modified: Date,
    children: FileElement[]
}

export type GroupType = "unknown" | "folder" | "3d" | "acrobat" | "audio" | "binary" | "code" | "compressed" | "document" | "drive" | "font" | "image" | "presentation" | "settings" | "spreadsheet" | "vector" | "video"
