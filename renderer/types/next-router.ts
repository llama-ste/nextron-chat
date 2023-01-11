import { UrlObject } from "url";

type TUrl = UrlObject | string;

interface ITransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export type TReplaceFn = (
  url: TUrl,
  as?: TUrl,
  options?: ITransitionOptions
) => Promise<boolean>;
