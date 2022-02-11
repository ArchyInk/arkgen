export declare type ResponseType<T> = {
    msg: string;
    data: T;
    success: boolean;
};
export default class Resp<T> {
    private _msg;
    private _data;
    private _success;
    constructor();
    set msg(msg: string);
    get msg(): string;
    set data(data: T);
    get data(): T;
    get success(): boolean;
    set success(success: boolean);
    toRes(): ResponseType<T>;
    setRes(msg: string, success?: boolean, data?: T): void;
}
