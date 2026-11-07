<script lang="ts">
	import Background from '../components/background.svelte';
	import { addMapping, getMappings } from '#lib/emojis.remote.ts';

	let from = $state('');
	let to = $state('');
	let mappings = $state(await getMappings());

	async function translateTo() {
    const result = [];
    for (const char of from) {
        let mapping = mappings.find((m) => m.title === char);
        if (!mapping) {
            mapping = await addMapping(char);
            mappings = [...mappings, mapping];
        }
        result.push(mapping.emoji);
    }

    to = result.join('');
	}
	async function translateFrom() {
		const result = [];
		for (const char of to) {
			const mapping = mappings.find((m) => m.emoji === char);
			result.push(mapping?.title ?? char);
		}
		from = result.join('');
	}
</script>

<Background>
	<h1 class="flex items-center justify-center py-4 text-6xl font-bold">the emoji dictionary</h1>

	<div class="flex h-[calc(100vh-2rem)] w-full text-5xl">
		<textarea
			class="h-full w-1/2 resize-none border-2 bg-slate-600 p-4 focus:ring-0 focus:outline-none"
			bind:value={from}
			oninput={translateTo}></textarea>
		<textarea
			class="h-full w-1/2 resize-none border-2 bg-slate-600 p-4 focus:ring-0 focus:outline-none"
			bind:value={to}
			oninput={translateFrom}></textarea>
	</div>
</Background>
