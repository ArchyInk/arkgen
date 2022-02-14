import { DirType } from '../../../types/server';
declare const router: import("express-serve-static-core").Router;
export declare type ProjectInfoType = {
    path: string;
    dirs: DirType[];
    hasPkg?: boolean;
    pkg?: string;
    hasViteConfig?: boolean;
    viteConfig?: string;
};
export default router;
