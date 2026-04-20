"use client";

import { X } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Command, CommandGroup, CommandItem } from "../../../../components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select..." }: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = useCallback((option: Option) => {
    onChange([...selected, option.value]);
    setInputValue("");
  }, [onChange, selected]);

  const handleUnselect = useCallback((value: string) => {
    onChange(selected.filter((s) => s !== value));
  }, [onChange, selected]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          handleUnselect(selected[selected.length - 1]);
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [handleUnselect, selected]);

  const filteredOptions = options.filter(option => 
    !selected.includes(option.value) &&
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((value) => {
            const option = options.find(o => o.value === value);
            return (
              <Badge key={value} variant="secondary">
                {option?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {isOpen && filteredOptions.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => handleSelect(option)}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
