import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

interface HelpProps {
  children: React.ReactNode;
}

const Help = ({ children }: HelpProps) => {
  const [clicked, setClicked] = useState(false);

  const helpRef = useRef<HTMLInputElement>(null);

  const onClickOutSide = (e: any) => {
    if (clicked && helpRef.current && !helpRef.current.contains(e.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutSide);
    return () => {
      document.removeEventListener("click", onClickOutSide);
    };
  });
  return (
    <div className="help__container" ref={helpRef}>
      <Icon icon="material-symbols:help" onClick={() => setClicked(!clicked)} />
      {clicked ? <div className="help-message">{children}</div> : null}
    </div>
  );
};

export default Help;
