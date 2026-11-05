import { useEffect, useId, useRef, useState } from "react";

function AccessibleDropdown({ items = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  const listId = useId();

  // Move focus to the list or the active option when it opens
  useEffect(() => {
    if (!isOpen) return;

    if (activeIndex >= 0) {
      optionRefs.current[activeIndex]?.focus();
    } else {
      listRef.current?.focus();
    }
  }, [isOpen, activeIndex]);

  // Select an option and return focus to the button
  function selectItem(item) {
    onSelect(item);
    setIsOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < 0 ? 0 : Math.min(prev + 1, items.length - 1)
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < 0
            ? items.length - 1
            : Math.max(prev - 1, 0)
        );
        break;

      case "Enter":
      case " ":
        e.preventDefault();

        if (activeIndex >= 0 && items[activeIndex] !== undefined) {
          selectItem(items[activeIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        buttonRef.current?.focus();
        break;

      default:
        break;
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setActiveIndex(-1);
        }}
      >
        Choose category
      </button>

      {isOpen && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label="Categories"
          tabIndex={-1}
        >
          {items.map((item, index) => (
            <li
              key={item}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              tabIndex={-1}
              role="option"
              aria-selected={activeIndex === index}
              onClick={() => selectItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccessibleDropdown;