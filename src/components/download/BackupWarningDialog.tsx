import { Plural, Trans } from "@lingui/react/macro";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DryRunResult } from "@/types/download";

interface BackupWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  dryRunResult?: DryRunResult;
  hasBackup: boolean;
}

export function BackupWarningDialog({
  open,
  onOpenChange,
  onConfirm,
  dryRunResult,
  hasBackup,
}: BackupWarningDialogProps) {
  const wouldDelete = dryRunResult?.would_delete ?? false;
  const deletedCount = dryRunResult?.deleted_files?.length ?? 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {wouldDelete ? (
              <Trans>Warning: Files Will Be Deleted</Trans>
            ) : (
              <Trans>Warning: Potentially Destructive Operation</Trans>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            {wouldDelete ? (
              <>
                <p>
                  <Trans>
                    The dry run detected that{" "}
                    <strong>
                      <Plural
                        value={deletedCount}
                        _0="some files"
                        one="# file"
                        other="# files"
                      />
                    </strong>{" "}
                    in the destination will be deleted during this sync
                    operation.
                  </Trans>
                </p>
                {deletedCount > 0 && (
                  <div className="border rounded-md bg-muted/50">
                    <ScrollArea className="h-40 rounded-md p-2">
                      <ul className="text-xs font-mono space-y-1">
                        {dryRunResult?.deleted_files?.map((file) => (
                          <li
                            key={file}
                            className="break-all text-red-600 dark:text-red-400"
                          >
                            - {file}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                )}
                {dryRunResult?.stats && (
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    {dryRunResult.stats}
                  </p>
                )}
                {!hasBackup && (
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    <Trans>
                      ⚠️ You have backups disabled! Deleted files will be
                      permanently lost.
                    </Trans>
                  </p>
                )}
                {hasBackup && (
                  <p className="text-green-600 dark:text-green-400">
                    <Trans>✓ A backup will be created before syncing.</Trans>
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  <Trans>
                    This sync operation may overwrite or delete files in the
                    destination folder that don't exist in the source.
                  </Trans>
                </p>
                {!hasBackup && (
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    <Trans>
                      ⚠️ You have backups disabled! Any deleted files will be
                      permanently lost.
                    </Trans>
                  </p>
                )}
              </>
            )}
            <p className="pt-2">
              <Trans>Are you sure you want to continue?</Trans>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Trans>Cancel</Trans>
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            <Trans>Yes, Continue</Trans>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
