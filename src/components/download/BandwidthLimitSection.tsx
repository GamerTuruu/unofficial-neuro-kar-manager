import { Trans } from "@lingui/react/macro";
import { Info } from "lucide-react";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
} from "@/components/ui/hybrid-tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isAndroid } from "@/lib/android-utils";

interface BandwidthLimitSectionProps {
  bandwidthLimit: string;
  onBandwidthLimitChange: (value: string) => void;
  bandwidthUnit: string;
  onBandwidthUnitChange: (unit: string) => void;
  disabled: boolean;
}

/**
 * Reusable bandwidth limit section component
 * Can be used in both advanced options modal and as a standalone component on Android
 */
export function BandwidthLimitSection({
  bandwidthLimit,
  onBandwidthLimitChange,
  bandwidthUnit,
  onBandwidthUnitChange,
  disabled,
}: BandwidthLimitSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor="bandwidthLimit" className="text-sm font-medium">
          <Trans>Bandwidth Limit</Trans>
        </Label>
        <HybridTooltip>
          <HybridTooltipTrigger asChild>
            <Info className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
          </HybridTooltipTrigger>
          <HybridTooltipContent className="w-80">
            <p className="text-sm">
              <Trans>
                Limit download bandwidth to avoid using all your connection. Leave empty for no limit. Useful for slow or shared connections.
              </Trans>
            </p>
          </HybridTooltipContent>
        </HybridTooltip>
      </div>
      <div className={isAndroid() ? "flex gap-2" : "flex gap-2"}>
        <Input
          id="bandwidthLimit"
          type="number"
          min="0"
          step="0.1"
          placeholder={isAndroid() ? "E.g. 10" : "No limit"}
          value={bandwidthLimit}
          onChange={(e) => onBandwidthLimitChange(e.target.value)}
          disabled={disabled}
          className="flex-1"
        />
        <Select
          value={bandwidthUnit}
          onValueChange={onBandwidthUnitChange}
          disabled={disabled}
        >
          <SelectTrigger className={isAndroid() ? "w-28" : "w-24"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="K">KB/s</SelectItem>
            <SelectItem value="M">MB/s</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isAndroid() && (
        <p className="text-xs text-muted-foreground">
          <Trans>Recommended: 5-10 MB/s on mobile networks</Trans>
        </p>
      )}
    </div>
  );
}
