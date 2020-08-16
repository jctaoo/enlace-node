import ApplicationEvents from "../application_events";
interface ApplicationEventsMark<Meta = unknown> {
    type: ApplicationEvents;
    meta: Meta;
    target: Function;
}
export default ApplicationEventsMark;
