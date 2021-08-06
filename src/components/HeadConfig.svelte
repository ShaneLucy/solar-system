<script lang="ts">
	export let name;
</script>

<svelte:head>
	<title>Solar System</title>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href={`assets/favicons/${name}/apple-touch-icon.png`}
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href={`assets/favicons/${name}/favicon-32x32.png`}
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href={`assets/favicons/${name}/favicon-16x16.png`}
	/>
	<link rel="manifest" href={`assets/favicon/${name}/site.webmanifest`} />
	<link
		rel="mask-icon"
		href={'assets/favicons/solar-system/safari-pinned-tab.svg'}
		color="#5bbad5"
	/>
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>
