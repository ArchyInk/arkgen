import { DirType } from '../../../types/server';
/**
 * @description: 判断路径是否为目录
 * @param {string} path
 * @return {boolean}
 */
export declare const isDir: (path: string) => boolean;
/**
 * @description: 判断路径是否为文件
 * @param {string} path
 * @return {boolean}
 */
export declare const isFile: (path: string) => boolean;
/**
 * @description: 判断路径是否存在
 * @param {string} path
 * @return {boolean}
 */
export declare const isExist: (path: string) => boolean;
/**
 * @description: 判断路径类型
 * @param {string} path
 * @return {'directory' | 'file' | 'unknown'}
 */
export declare const pathType: (path: string) => 'directory' | 'file' | 'unknown';
/**
 * @description: 目录详情，获取目录下所有路径的详情
 * @param {string} path
 * @return {DirsType}
 */
export declare const dirDetail: (path: string) => Promise<DirType[]>;
/**
 * @description: 向下查找文件
 * @param {string} filename 文件名,支持通配符
 * @param {{ exclude?: string[]; include?: string[]; cwd?: string }} options exclude 排除的文件夹 include包括的文件夹 cwd搜索的根目录，默认为项目根目录
 * @return {string}
 */
export declare const findFileAsync: (filename: string, options?: {
    exclude?: string[];
    include?: string[];
    cwd?: string;
}) => string;
/**
 * @description: 向上查找pkg
 * @param {*}
 * @return {*}
 */
export declare const findPkg: () => Promise<{
    hasPkg: boolean;
    pkg?: string;
}>;
/**
 * @description: 向上查找vite配置
 * @param {*}
 * @return {*}
 */
export declare const findViteConfig: () => Promise<{
    hasViteConfig: boolean;
    viteConfig?: string;
}>;
/**
 * @description: 删除字符串首尾双引号
 * @param {string} strs
 * @return {*}
 */
export declare const removeDblquo: (str: string) => string;
/**
 * @description: 解决中文会乱码的问题
 * @param {*}
 * @return {*}
 */
export declare const transformEncode: (arg: string | Buffer) => string;
/**
 * @description: 解决exec显示中文会乱码的问题
 * @param {*} cmd string 命令
 * @return {*}
 */
export declare const execaShims: (cmd: string, cwd: string) => Promise<{
    stdout: string;
    stderr: string;
}>;
