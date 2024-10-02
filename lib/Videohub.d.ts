import { VideohubEventType, VideohubEventCallback, VideohubStatus } from "./VideohubConnection";
export declare class Videohub {
    private host;
    private port;
    private conn;
    private status;
    private firstStatusPromise;
    private firstStatusPromiseResolve;
    private firstStatusResolved;
    constructor(host: string, port: number);
    on(type: VideohubEventType, fn: VideohubEventCallback): Promise<void>;
    off(type: VideohubEventType, fn: VideohubEventCallback): Promise<void>;
    init(): Promise<void>;
    getStatus(): VideohubStatus;
    getStatusAsync(): Promise<VideohubStatus>;
    setLabel(type: "output" | "input" | "monitoring" | "serial-port", num: number, newName: string): void;
    setRouting(type: "output" | "monitoring" | "serial-port" | "processing-unit", outputNumber: number, inputNumber: number): void;
    setLock(type: "output" | "monitoring" | "serial-port" | "processing-unit", num: number, isLocked: boolean): void;
}
