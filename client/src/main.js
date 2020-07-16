import App from './App.svelte';

import 'focus-visible';
import './styles/tailwind.css';

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
