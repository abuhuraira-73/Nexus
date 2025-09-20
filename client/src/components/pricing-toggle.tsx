import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export const PricingToggle = ({ isYearly, onToggle }: PricingToggleProps) => {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      defaultValue={isYearly ? "yearly" : "monthly"}
      onValueChange={(value) => onToggle(value === "yearly")}
      className="justify-center"
    >
      <ToggleGroupItem value="monthly" aria-label="Toggle monthly">
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" aria-label="Toggle yearly">
        Annually
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
