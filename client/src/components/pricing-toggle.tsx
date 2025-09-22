import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export const PricingToggle = ({ isYearly, onToggle }: PricingToggleProps) => {
  return (
    <div className="relative w-fit">
      <ToggleGroup
        type="single"
        defaultValue={isYearly ? "yearly" : "monthly"}
        onValueChange={(value) => onToggle(value === "yearly")}
        className="justify-center bg-white/10 backdrop-blur-sm border-0 rounded-full p-0.5 h-10"
      >
        <motion.div
          className="absolute inset-0.5 bg-white rounded-full"
          layout
          style={{
            width: 'calc(50% - 2px)',
          }}
          animate={{
            x: isYearly ? '100%' : '0%',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <ToggleGroupItem
          value="monthly"
          aria-label="Toggle monthly"
          className="z-10 rounded-full data-[state=on]:bg-transparent data-[state=on]:text-gray-600 text-white text-sm h-8 px-4 hover:bg-transparent"
        >
          Monthly
        </ToggleGroupItem>
        <ToggleGroupItem
          value="yearly"
          aria-label="Toggle yearly"
          className="z-10 rounded-full data-[state=on]:bg-transparent data-[state=on]:text-gray-600 text-white text-sm h-8 px-4 hover:bg-transparent"
        >
          Annually
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};