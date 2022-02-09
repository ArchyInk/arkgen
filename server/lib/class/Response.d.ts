export default class Resp {
    private _msg;
    private _data;
    private _success;
    constructor();
    set msg(msg: string);
    get msg(): string;
    set data(data: any);
    get data(): any;
    get success(): boolean;
    set success(success: boolean);
    toRes(): {
        msg: string;
        success: boolean;
        data: any;
    };
    setRes(msg: string, success?: boolean, data?: any): void;
}
