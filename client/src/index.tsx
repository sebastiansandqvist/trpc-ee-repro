/* @refresh reload */
import { render } from 'solid-js/web';
import { QueryClientProvider } from '@tanstack/solid-query';
import { queryClient, trpc } from './trpc';
import { createSignal, For, onCleanup } from 'solid-js';

function App() {
  const [messages, setMessages] = createSignal<string[]>([]);
  const [text, setText] = createSignal<string>('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    trpc.sendMessage.mutate({ text: text() });
    setText('');
  };

  const chat = trpc.sub.subscribe(undefined, {
    onData(message) {
      setMessages((prev) => [...prev, message]);
    },
  });

  onCleanup(() => chat.unsubscribe());

  return (
    <div>
      <ul>
        <For each={messages()}>{(message) => <li>{message}</li>}</For>
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text()} onInput={(e) => setText(e.currentTarget.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ),
  document.getElementById('root')!,
);
