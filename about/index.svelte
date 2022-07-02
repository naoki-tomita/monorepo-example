<script>
  let count = 0;
  function increment() {
    count++;
  }
</script>
<h1>About</h1>
<p>count: {count}</p>
<button on:click={increment}>count++</button>
