import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface DownloadLogsProps {
  log: string;
  status: string;
  loading?: boolean;
}

export function DownloadLogs({ log, status, loading }: DownloadLogsProps) {
  return (
    <>
      {loading && (
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground animate-pulse">
            <Trans>Starting download process...</Trans>
          </p>
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            <Trans>Logs</Trans>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={log || t`Ready to download.`}
            className="font-mono text-xs min-h-37.5"
          />
          {status && <p className="mt-2 text-sm font-semibold">{status}</p>}
        </CardContent>
      </Card>
    </>
  );
}
