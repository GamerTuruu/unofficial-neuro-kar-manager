import { Trans } from "@lingui/react/macro";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">
        <Trans>Welcome to Unofficial Neuro Karaoke Archive Manager</Trans>
      </h1>
      <p className="text-xl text-muted-foreground">
        <Trans>This page is under construction</Trans>
      </p>
    </div>
  );
}
