# trpc subscription bug repro

## project initialization

server:

```bash
cd server
p i
p dev
```

client:

```bash
cd client
p i
p dev
```

## bug reproduction

1. visit http://localhost:5173
2. send any message in the form to trigger the server-side event emitter
3. refresh the page a few times
4. send another message. you should see that there are several event listeners that were not cleaned up
