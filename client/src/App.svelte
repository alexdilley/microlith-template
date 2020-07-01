<script>
  import './styles/index.css';

  export let name;
</script>

<style>
  :global(body) {
    @apply antialiased font-sans;
  }
</style>

<main class="max-w-xs sm:max-w-none h-screen p-4 m-auto text-center">
  <h1 class="my-10 text-6xl font-hairline leading-tight text-primary uppercase">
    hello, {name}!
  </h1>
  <p class="my-4 leading-tight">
    Visit the
    <a href="https://svelte.dev/tutorial" class="text-blue-700">
      Svelte tutorial
    </a>
    to learn how to build Svelte apps.
  </p>
</main>
