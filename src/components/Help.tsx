import { Icon } from "@iconify/react";
import { useState } from "react";

interface HelpProps {
  children: React.ReactNode;
}

const Help = ({ children }: HelpProps) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="help__container">
      <Icon icon="material-symbols:help" onClick={() => setClicked(!clicked)} />
      {clicked ? <div className="help-message">{children}</div> : null}
    </div>
  );
};

export default Help;
