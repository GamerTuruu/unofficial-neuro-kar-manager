import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { Check, FolderSearch, Settings, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SourceInputSectionProps {
  source: string;
  onSourceChange: (source: string) => void;
  selectedFiles: string[] | null;
  onClearSelection: () => void;
  onBrowseClick: () => void;
  disabled: boolean;
}

export function SourceInputSection({
  source,
  onSourceChange,
  selectedFiles,
  onClearSelection,
  onBrowseClick,
  disabled,
}: SourceInputSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="source" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        <Trans>GDrive Source (Link or ID)</Trans>
      </Label>
      <div className="flex gap-2">
        <Input
          id="source"
          type="text"
          placeholder={t`e.g. 1AbCdEfGhIjK...`}
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          title={t`Browse Files`}
          disabled={disabled}
          onClick={onBrowseClick}
        >
          <FolderSearch className="h-4 w-4" />
        </Button>
      </div>

      {selectedFiles && selectedFiles.length > 0 && (
        <div className="text-sm text-blue-500 flex items-center gap-2 mt-1">
          <Check className="h-3 w-3" />
          <Trans>
            {selectedFiles.length} files/folders selected for download.
          </Trans>
          <button
            type="button"
            className="text-muted-foreground hover:text-destructive flex items-center"
            onClick={onClearSelection}
          >
            <XCircle className="h-3 w-3 ml-1" /> <Trans>Clear</Trans>
          </button>
        </div>
      )}
    </div>
  );
}
