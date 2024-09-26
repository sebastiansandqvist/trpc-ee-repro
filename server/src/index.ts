import cors from 'cors';
import { EventEmitter, on } from 'node:events';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext, publicProcedure, router } from './trpc';

const ee = new EventEmitter<{ message: string[] }>();

const appRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      ee.emit('message', input.text);
    }),
  sub: publicProcedure.subscription(async function* ({ signal }) {
    for await (const [message] of on(ee, 'message', { signal }) as AsyncIterableIterator<[string]>) {
      console.log(ee.listenerCount('message'));
      yield message;
    }
  }),
});

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: '*',
  }),
  createContext,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
