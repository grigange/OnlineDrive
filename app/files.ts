import { GroupType } from "./types";

export const extensionGroups: { [K in GroupType]: string[] } = {
    "3d": [".3dm", ".3ds", ".obj", ".stl"],
    "acrobat": [".pdf"],
    "audio": [".mp3", ".wav", ".ogg", ".flac", ".aac"],
    "binary": [".bin", ".exe"],
    "code": [".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".php", ".py", ".java", ".cpp", ".c", ".cs", ".rb", ".json", ".xml"],
    "compressed": [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
    "document": [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".odt", ".ods", ".odp", ".txt"],
    "drive": [".gd", ".gdoc", ".gsheet", ".gslides", ".gdraw"],
    "font": [".ttf", ".otf", ".woff", ".woff2"],
    "image": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".tif", ".tiff"],
    "presentation": [".ppt", ".pptx"],
    "settings": [".ini", ".cfg", ".conf"],
    "spreadsheet": [".xls", ".xlsx", ".csv"],
    "vector": [".ai", ".eps", ".svg"],
    "video": [".mp4", ".mov", ".avi", ".mkv", ".wmv", ".webm", ".flv", ".mpeg", ".mpg", ".3gp", ".3g2"],
    "folder": [],
    "unknown": []
};

export const extensionColors = new Map<GroupType, string>([
    ["3d", "#8B4513"], // Brown
    ["acrobat", "#2E8B57"], // SeaGreen
    ["audio", "#8A2BE2"], // BlueViolet
    ["binary", "#6495ED"], // CornflowerBlue
    ["code", "#4682B4"], // SteelBlue
    ["compressed", "#808000"], // Olive
    ["document", "#B22222"], // FireBrick
    ["drive", "#20B2AA"], // LightSeaGreen
    ["font", "#556B2F"], // DarkOliveGreen
    ["image", "#FFD700"], // Gold
    ["presentation", "#BA55D3"], // MediumOrchid
    ["settings", "#87CEFA"], // LightSkyBlue
    ["spreadsheet", "#008080"], // Teal
    ["vector", "#DC143C"], // Crimson
    ["video", "#00FFFF"], // Crimson
    ["folder", "#123"], // Cyan
    ["unknown", "#f07"] // Cyan
]);

export function getFileExtension(filename: string): string {
    // Get the last index of '.' to handle cases like 'file.name.with.dots.jpg'
    const lastDotIndex = filename.lastIndexOf(".");

    // If there is no dot in the filename or the dot is the last character, return an empty string
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
        return "";
    }

    // Extract the extension using substring
    return filename.substring(lastDotIndex + 1);
}
export function getExtensionGroup(extension: string): GroupType {
    if (extension == "") return "folder"
    for (const g in extensionGroups) {
        if (extensionGroups[g as GroupType].includes("." + extension)) return g as GroupType
    }
    throw Error("Extension does not exist"); // Return empty string if extension doesn't belong to any group
}

export const getGroupColor = (group: GroupType) => {
    return extensionColors.get(group)
}

