export declare const isDir: (path: string) => boolean;
export declare const isFile: (path: string) => boolean;
export declare const isExist: (path: string) => boolean;
export declare const fileType: (path: string) => "directory" | "file" | "unknown";
export declare const dirDetail: (path: string) => any[];
export declare const findFileAsync: (filename: string, options?: {
    exclude?: string[];
    include?: string[];
    cwd?: string;
}) => string;
