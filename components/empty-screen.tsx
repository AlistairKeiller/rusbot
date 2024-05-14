export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8 mb-4">
        <h1 className="mb-2 text-lg font-semibold">Welcome to Chekhov Chat!</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          ChekhovChat will tell you how Alistair thinks that Chekhov would have
          responded in 1890, using his 75 books for context.
        </p>
      </div>
    </div>
  );
}
