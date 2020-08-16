"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const injector_1 = require("./injector/");
const server_1 = require("./server");
const util_1 = require("../util/");
const decorators_1 = require("../decorators/");
const application_events_1 = require("../application_events");
const constant_1 = require("../constant");
class Environment {
    constructor() {
        // todo better way
        this.ApplicationKey = Symbol("ApplicationKey");
        this.server = this.registerServer();
        this.isReady = false;
        this.adaptorToObserver = new Map();
    }
    initApp(app) {
        if (!this.app) {
            util_1.Log.clear();
            util_1.Log.success(constant_1.WELCOME_WORDS, constant_1.PROJECT_NAME);
            util_1.Log.info(constant_1.LOGO);
            this.app = this.registerApplication(app);
            this.setEventsInAdaptor();
            // observe adaptors in server
            this.server.adaptorsToConfigure.observeChange(updated => {
                if (this.isReady) {
                    this.callAdaptorObserver(updated.key);
                }
            });
        }
        else {
            // todo log here
        }
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            // todo 
        });
    }
    run(app) {
        return __awaiter(this, void 0, void 0, function* () {
            this.initApp(app);
            if (this.app.config.scan) {
                yield this.scan();
            }
            this.app.configure(injector_1.Injector.shard, this.server);
            this.server.start();
            this.isReady = true;
            for (const [key] of this.server.adaptorsToConfigure) {
                this.callAdaptorObserver(key);
            }
            util_1.Log.success("\nenlace is ready!!\n");
            this.app.onStartUp();
        });
    }
    callAdaptorObserver(adaptor) {
        const observer = this.adaptorToObserver.get(adaptor);
        if (observer) {
            observer(adaptor.router);
        }
    }
    registerServer() {
        injector_1.Injector.shard.register(server_1.EnlaceServer);
        return injector_1.Injector.shard.resolve(server_1.EnlaceServer);
    }
    registerApplication(app) {
        injector_1.Injector.shard.register(this.ApplicationKey, app);
        return injector_1.Injector.shard.resolve(this.ApplicationKey);
    }
    setEventsInAdaptor() {
        const eventsMark = decorators_1.getEventsMarkInApplication(this.app);
        for (const mark of eventsMark) {
            if (mark.type === application_events_1.default.onAddAdaptor) {
                const adaptorMark = mark;
                // todo 检查adaptor是否在server里
                this.adaptorToObserver.set(adaptorMark.meta, adaptorMark.target);
            }
        }
    }
}
exports.Environment = Environment;
Environment.shard = new Environment();
//# sourceMappingURL=envrionment.js.map