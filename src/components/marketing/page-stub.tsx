interface PageStubProps {
  title: string;
  description?: string;
}

export function PageStub({ title, description }: PageStubProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
    </section>
  );
}
