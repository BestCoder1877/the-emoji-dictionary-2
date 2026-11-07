<script lang="ts">
    import type { Snippet } from 'svelte';
    let { children }: { children: Snippet } = $props();
</script>

<div
	class="flex min-h-screen flex-col overflow-x-hidden overscroll-y-contain bg-gray-800 p-4 text-slate-50"
>
	<div class="grow space-y-6 overflow-y-auto overscroll-y-contain">
	    {@render children()}
	</div>

	<div class="mt-4"></div>
</div>
