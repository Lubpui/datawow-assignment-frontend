export interface Payload<T = undefined> {
  signal?: AbortSignal;
  data?: T;
}
