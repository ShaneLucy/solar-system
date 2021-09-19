<script lang="ts">
  import Nav from './Nav.svelte';
  import type { NavDirection } from '../types';

  let navDirection: NavDirection = window.innerWidth <= 480 ? 'column' : 'row';

  window.addEventListener('resize', () => {
    navDirection = window.innerWidth <= 480 ? 'column' : 'row';
  });
</script>

<section>
  <h1>The page you requested was not found</h1>
  <div>
    <img
      src="assets/images/404.png"
      alt="Person in space suit reaching into void of space"
    />

    <main>
      <Nav
        toggleNavBar={() => {}}
        --div-direction={'column'}
        --nav-direction={navDirection}
      />
    </main>
  </div>
</section>

<style>
  section {
    min-height: 100%;
    background-color: var(--primary);
  }

  h1 {
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 2rem;
    font-size: 1.35rem;
    margin: 0 2rem;
    color: var(--tertiary);
  }

  div {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    height: auto;
    width: 50%;
    margin-bottom: 1rem;
  }

  main {
    width: 100%;
  }

  @media screen and (min-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }

    img {
      width: 25%;
    }
  }
</style>
