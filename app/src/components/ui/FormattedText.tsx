interface Block {
  type: 'list' | 'paragraph';
  lines: string[];
}

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const isBullet = line.startsWith('o ') || line.startsWith('- ');
    const content = isBullet ? line.slice(2).trim() : line;
    const last = blocks.at(-1);

    if (isBullet) {
      if (last?.type === 'list') last.lines.push(content);
      else blocks.push({ type: 'list', lines: [content] });
    } else {
      if (last?.type === 'paragraph') last.lines.push(content);
      else blocks.push({ type: 'paragraph', lines: [content] });
    }
  }

  return blocks;
}

export default function FormattedText({ text }: { text: string }) {
  const blocks = parseBlocks(text);

  return (
    <div className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i} className="list-disc space-y-1 pl-5 marker:text-slate-400">
            {block.lines.map((line, j) => (
              <li key={j}>{line}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.lines.join(' ')}</p>
        ),
      )}
    </div>
  );
}
