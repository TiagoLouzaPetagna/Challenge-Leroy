// The project uses Workers through Vinext, whose ambient types cover D1 but not
// Durable Objects. Keep this small declaration limited to the APIs used here.
declare module "cloudflare:workers" {
  export interface DurableObjectState {
    storage: {
      get<T>(key: string): Promise<T | undefined>;
      put(key: string, value: unknown): Promise<void>;
      setAlarm(when: number): Promise<void>;
      deleteAll(): Promise<void>;
    };
    getWebSockets(): WebSocket[];
    acceptWebSocket(socket: WebSocket): void;
  }

  export class DurableObject<Env> {
    protected ctx: DurableObjectState;
    protected env: Env;
    constructor(ctx: DurableObjectState, env: Env);
  }
}

interface DurableObjectNamespace {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(request: Request): Promise<Response> };
}

interface WebSocket {
  serializeAttachment(value: unknown): void;
  deserializeAttachment(): unknown;
}

declare const WebSocketPair: {
  new (): { 0: WebSocket; 1: WebSocket };
};

interface ResponseInit {
  webSocket?: WebSocket;
}
