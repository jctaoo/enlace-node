import {
  yellow,
  white,
  green,
  red,
  bold,
} from "chalk";

export default class Log {

  static clear() {
    console.clear()
  }

  static info(message: string, tag: string = "") {
    const coloredTag = yellow(bold(`[${tag}]  `));
    const coloredMessage = white(message);
    console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
  }

  static success(message: string, tag: string = "") {
    const coloredTag = yellow(bold(`[${tag}]  `));
    const coloredMessage = green(bold(message));
    console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
  }

  static warning(message: string, tag: string = "") {
    const coloredTag = yellow(bold(`[${tag}]  `));
    const coloredMessage = yellow(bold(message));
    console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
  }

  static error(message: string, tag: string = "") {
    const coloredTag = yellow(bold(`[${tag}]  `));
    const coloredMessage = red(bold(message));
    console.error((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
  }

}