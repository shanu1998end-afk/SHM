export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) {
    return '';
  }

  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? '';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  return [headers.join(','), ...lines].join('\n');
}
