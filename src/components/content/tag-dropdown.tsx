import { useClickOutside } from "../../hooks/use-click-outside";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

type TagDropdownLinkProps = {
  text: string;
  tag?: string;
  isSelected: boolean;
  onClick: () => void;
};

function TagDropdownLink({ text, tag, isSelected, onClick }: TagDropdownLinkProps) {
  return (
    <Link
      to="."
      search={{ tag }}
      onClick={onClick}
      className={`text-theme-text hocus:bg-theme-backgroundHighlight block px-2 text-sm leading-6 transition-colors ${isSelected ? "bg-theme-backgroundHighlight" : ""}`}
    >
      {text}
    </Link>
  );
}

export type TagDropdownProps = {
  tags: string[];
  selectedTag: string | undefined;
  label?: string;
};

export function TagDropdown({ tags, selectedTag, label = "All Tags" }: TagDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-theme-extraLightText hocus:text-theme-header relative z-10 -mx-0.5 inline-flex cursor-pointer items-center gap-0.5 rounded-full px-0.5 text-sm leading-none transition-all duration-75 ease-in"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <ChevronDown size={14} className="invisible" />
        <span>{selectedTag ? `#${selectedTag}` : label}</span>
        <ChevronDown size={14} className="transition-transform duration-200" />
      </button>

      {isOpen && (
        <div className="bg-theme-background border-theme-backgroundHighlight absolute left-1/2 z-50 mt-2 max-h-46 w-max min-w-32 -translate-x-1/2 overflow-hidden overflow-y-auto rounded-lg border shadow-lg">
          <TagDropdownLink
            text="All Tags"
            isSelected={!selectedTag}
            onClick={() => setIsOpen(false)}
          />

          {tags.map((tag) => (
            <TagDropdownLink
              key={tag}
              text={`#${tag}`}
              tag={tag}
              isSelected={selectedTag === tag}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
