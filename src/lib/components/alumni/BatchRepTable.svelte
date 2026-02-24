<script>
	let { officers = [] } = $props();

	// Group by batchYear, then sort by year ascending
	let rows = $derived.by(() => {
		const grouped = {};
		for (const officer of officers) {
			const year = officer.batchYear || 'Unknown';
			if (!grouped[year]) grouped[year] = [];
			grouped[year].push(officer.name || 'Vacant');
		}
		return Object.entries(grouped)
			.sort(([a], [b]) => Number(a) - Number(b))
			.map(([year, names]) => ({ year, names: names.join(', ') }));
	});
</script>

<div class="overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
	<table class="w-full">
		<thead>
			<tr class="border-b border-gray-100 bg-gray-50">
				<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
				<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Representative(s)</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row, i}
				<tr class="{i % 2 === 1 ? 'bg-gray-50/50' : ''} border-b border-gray-50 last:border-b-0">
					<td class="px-6 py-3 text-sm font-semibold text-accent-blue-dark">{row.year}</td>
					<td class="px-6 py-3 text-sm text-gray-700">{row.names || '—'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
