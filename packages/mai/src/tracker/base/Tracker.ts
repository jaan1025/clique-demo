export type Handler = (payload: Record<string, any>) => void;

export abstract class Tracker {
  // todo

  public abstract init(handler: Handler): void;
  public abstract start(): void;
}