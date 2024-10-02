"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VideohubConnection_1 = require("./VideohubConnection");
class Videohub {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.firstStatusPromiseResolve = null;
        this.firstStatusResolved = false;
        this.firstStatusPromise = new Promise((resolve, reject) => {
            this.firstStatusPromiseResolve = resolve;
        });
        this.conn = new VideohubConnection_1.VideohubConnection(host, port);
    }
    async on(type, fn) {
        this.conn.on(type, fn);
    }
    async off(type, fn) {
        this.conn.off(type, fn);
    }
    async init() {
        await this.conn.init();
        this.conn.on('update', (newStatus) => {
            if (!this.firstStatusResolved) {
                this.firstStatusResolved = true;
                this.firstStatusPromiseResolve();
            }
            this.status = newStatus;
        });
    }
    getStatus() {
        return this.status;
    }
    async getStatusAsync() {
        await this.firstStatusPromise;
        return this.status;
    }
    setLabel(type, num, newName) {
        let str = "";
        switch (type) {
            case "input":
                str += "INPUT LABELS:\n";
                break;
            case "output":
                str += "OUTPUT LABELS:\n";
                break;
            case "monitoring":
                str += "MONITORING OUTPUT LABELS:\n";
                break;
            case "serial-port":
                str += "SERIAL PORT LABELS:\n";
                break;
        }
        str += (num - 1) + " " + newName + "\n";
        str += "\n";
        this.conn.send(Buffer.from(str));
    }
    setRouting(type, outputNumber, inputNumber) {
        let str = "";
        switch (type) {
            case "output":
                str += "VIDEO OUTPUT ROUTING:\n";
                break;
            case "monitoring":
                str += "VIDEO MONITORING OUTPUT ROUTING:\n";
                break;
            case "serial-port":
                str += "SERIAL PORT ROUTING:\n";
                break;
            case "processing-unit":
                str += "PROCESSING UNIT ROUTING:\n";
                break;
        }
        str += (outputNumber - 1) + " " + (inputNumber - 1) + "\n";
        str += "\n";
        this.conn.send(Buffer.from(str));
    }
    setLock(type, num, isLocked) {
        let str = "";
        switch (type) {
            case "output":
                str += "VIDEO OUTPUT LOCKS:\n";
                break;
            case "monitoring":
                str += "MONITORING OUTPUT LOCKS:\n";
                break;
            case "serial-port":
                str += "SERIAL PORT LOCKS:\n";
                break;
            case "processing-unit":
                str += "PROCESSING UNIT LOCKS:\n";
                break;
        }
        str += (num - 1) + " " + ((isLocked) ? "O" : "U") + "\n";
        str += "\n";
        this.conn.send(Buffer.from(str));
    }
}
exports.Videohub = Videohub;
//# sourceMappingURL=Videohub.js.map