"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsMarkInApplication = exports.MainApplication = void 0;
const core_1 = require("../core/");
require("reflect-metadata");
const metadata_keys_1 = require("./metadata_keys");
const util_1 = require("../util/");
const injectable_1 = require("./injectable");
function MainApplication(arg) {
    const fn = (target, config) => {
        // combine injectable
        // todo better way
        injectable_1.injectable(target);
        // todo check Application
        core_1.Environment.shard.run(new target(config)).then();
    };
    if (core_1.isApplicationConfig(arg)) {
        return fn;
    }
    fn(arg);
}
exports.MainApplication = MainApplication;
function getEventsMarkInApplication(application) {
    const prototype = Object.getPrototypeOf(application);
    const methodName = Object.getOwnPropertyNames(prototype)
        .filter(item => util_1.Util.isFunction(prototype[item]) && !util_1.Util.canBeConstructed(prototype[item]));
    return methodName.map(method => {
        const fn = prototype[method];
        const configure = Reflect.getMetadata(metadata_keys_1.APPLICATION_EVENTS_MARK_KEY, fn);
        return configure;
    }).filter(i => i);
    // todo 关于去重复，参考swift里的compactMap
}
exports.getEventsMarkInApplication = getEventsMarkInApplication;
//# sourceMappingURL=main_application.js.map