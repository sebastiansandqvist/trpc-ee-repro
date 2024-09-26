import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

const t = initTRPC.context<Context>().create();

export const createContext = ({ info, req, res }: CreateHTTPContextOptions) => {
  return { info, req, res };
};

type Context = ReturnType<typeof createContext>;

export const router = t.router;
export const publicProcedure = t.procedure;
