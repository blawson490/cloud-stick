import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface CombinedLabelSelectProps {
  labelText: string;
  selectPlaceholder?: string;
  selectOptions: SelectOption[];
  onSelectChange: (value: string) => void;
}

const CombinedLabelSelect: React.FC<CombinedLabelSelectProps> = ({
  labelText,
  selectPlaceholder,
  selectOptions,
  onSelectChange,
}) => {
  return (
    <div className="flex">
      <Label className="rounded-l-md rounded-r-none border-r-0 border bg-secondary text-xs text-muted-foreground flex items-center shadow-sm px-2 focus-visible:ring-0 focus-visible:ring-offset-0">
        {labelText}
      </Label>
      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="rounded-l-none min-w-[80px] focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CombinedLabelSelect;
