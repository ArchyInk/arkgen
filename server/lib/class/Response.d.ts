export default class Resp {
    private _msg;
    private _data;
    private _success;
    constructor();
    set msg(msg: string);
    get msg(): string;
    set data(data: any);
    get data(): any;
    get success(): Boolean;
    set success(success: Boolean);
    toRes(): {
        msg: string;
        success: Boolean;
        data: any;
    };
}
