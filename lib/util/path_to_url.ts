import { IncomingHttpHeaders } from "http";

export const path_to_url = (header: IncomingHttpHeaders, url: string) => {
  return new URL(
    // TODO always http, solve https
    url, `http://${header.host}`
  );
};
