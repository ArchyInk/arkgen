export declare const isDir: (path: string) => boolean;
export declare const isFile: (path: string) => boolean;
export declare const isExist: (path: string) => void;
export declare const fileType: (path: string) => "directory" | "file" | "unknown";
export declare const dirDetail: (path: string) => any[];
