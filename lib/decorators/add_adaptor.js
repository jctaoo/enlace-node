"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdaptor = void 0;
const application_events_1 = require("../application_events");
require("reflect-metadata");
const metadata_keys_1 = require("./metadata_keys");
const util_1 = require("../util/");
const constant_1 = require("../constant");
const use_server_1 = require("./use_server");
function AddAdaptor(adaptorConstructor, configure = constant_1.DEFAULT_ADAPTOR_CONFIG) {
    const adaptor = use_server_1.useServer().addAdaptorWithConfigure(adaptorConstructor, configure);
    return (target, propertyKey, descriptor) => {
        var _a;
        // todo 考虑直接获取的api
        // const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[0]
        // console.log(Injector.shard.resolve(type));
        const defaultTarget = function () {
            util_1.Log.error("no target found.");
        };
        // todo
        const mark = {
            type: application_events_1.default.onAddAdaptor,
            meta: adaptor,
            target: ((_a = descriptor.value) !== null && _a !== void 0 ? _a : defaultTarget),
        };
        Reflect.defineMetadata(metadata_keys_1.APPLICATION_EVENTS_MARK_KEY, mark, descriptor.value);
    };
}
exports.AddAdaptor = AddAdaptor;
//# sourceMappingURL=add_adaptor.js.map