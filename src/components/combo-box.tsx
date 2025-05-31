"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const plantCatefories = [
  {
    value: "",
    label: "None",
  },
  {
    value: "Indoor",
    label: "Indoor",
  },
  {
    value: "Outdoor",
    label: "Outdoor",
  },
  {
    value: "Succulent",
    label: "Succulent",
  },
  {
    value: "Flowering",
    label: "Flowering",
  },
  {
    value: "Herb",
    label: "Herb",
  },
  {
    value: "Fern",
    label: "Fern",
  },
  {
    value: "Tree",
    label: "Tree",
  },
  {
    value: "Shrub",
    label: "Shrub",
  },
];

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlantConboBox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value !== ""
            ? plantCatefories.find(
                (plantCategory) => plantCategory.value === value
              )?.label
            : "Select plantCategory..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search plantCategory..." className="h-9" />
          <CommandList>
            <CommandEmpty>No plantCategory found.</CommandEmpty>
            <CommandGroup>
              {plantCatefories.map((plantCategory) => (
                <CommandItem
                  key={plantCategory.value}
                  value={plantCategory.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {plantCategory.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === plantCategory.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
