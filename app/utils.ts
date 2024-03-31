const BYTE_UNITS = [
    'B',
    'kB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
] as const;
export function prettifyBytes(number: number) {
    if (!Number.isFinite(number)) {
        throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
    }
    const exponent = Math.min(Math.floor(Math.log10(number) / 3), BYTE_UNITS.length - 1);
    number /= (1000) ** exponent;
    return number + " " + BYTE_UNITS[exponent];
}

export const prettifyPathArray = (path:string):string[] =>{
    return path.replace("public/","/").split("/").filter((word) => word != "");
}

export const prettifyPath = (path: string): string => {
    return path.replace("public/My%20Drive/", "My Drive/");
}

export const normalizeImageSrc = (path: string): string => {
    return path.replace("public/", "/");
}
export const normalizeDownloadLink = normalizeImageSrc

export const normalizeLinkPath = (path: string): string => {
    return path.replace("public/My Drive/", "/");
}

