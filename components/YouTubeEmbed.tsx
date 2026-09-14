export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <figure className="my-10">
      <div className="relative w-full overflow-hidden border border-green-border/40 bg-black" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 text-[12px] tracking-wide text-green-muted">{title} · embed oficial, não rehost</figcaption>
    </figure>
  )
}
