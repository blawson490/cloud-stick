import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface RadioOption {
  name: string;
  description: string;
  value: number;
}

interface CustomRadioGroupProps {
  groupName: string;
  options: RadioOption[];
  defaultValue: number;
  onChange: (value: number) => void;
}

const StickSizeRadioGroup: React.FC<CustomRadioGroupProps> = ({
  groupName,
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: number) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div>
      <Label>{groupName}</Label>
      <div className="mt-2 space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex flex-row items-start w-full p-3 justify-between rounded-lg cursor-pointer transition-all ${
              selectedValue === option.value
                ? "border-2 border-primary bg-background"
                : "border-2 border-gray-300"
            }`}
          >
            <div className="flex flex-row justify-start">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleChange(option.value)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedValue === option.value
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }`}
                >
                  {selectedValue === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{option.name}</p>
                <p className="text-muted-foreground text-xs">
                  {option.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-end text-right">
              <p className="font-medium text-xs text-primary">{option.value}</p>
              <p className="text-muted-foreground text-xs">mb</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StickSizeRadioGroup;
