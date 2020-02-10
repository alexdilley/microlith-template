<script>
  import './styles/index.css';

  export let name;
</script>

<main
  class="max-w-xs sm:max-w-none h-screen p-4 m-auto font-sans text-center
  subpixel-antialiased"
>
  <h1 class="my-10 text-6xl font-hairline leading-tight text-primary uppercase">
    Hello {name}!
  </h1>
  <p class="my-4 leading-tight">
    Visit the
    <a href="https://svelte.dev/tutorial" class="text-blue-700">
      Svelte tutorial
    </a>
    to learn how to build Svelte apps.
  </p>
</main>
