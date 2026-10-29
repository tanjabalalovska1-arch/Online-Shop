import useToggle from "../hooks/useToggle";

function ToggleDemo() {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <div>
      <h2>Toggle Demo</h2>

      <button onClick={toggleOpen}>
        {isOpen ? "Close" : "Open"}
      </button>

      {isOpen && <p>The panel is open!</p>}
    </div>
  );
}

export default ToggleDemo;