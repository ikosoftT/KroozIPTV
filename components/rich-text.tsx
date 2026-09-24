import Link from 'next/link';
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return match ? (
          <Link href={match[2]} key={i}>
            {match[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}
