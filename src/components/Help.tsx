import { Icon } from "@iconify/react";

interface HelpProps {
  children: React.ReactNode;
}

const Help = ({ children }: HelpProps) => {
  return (
    <div className="help__container">
      <Icon icon="material-symbols:help" />
      <div className="help-message">{children}</div>
    </div>
  );
};

export default Help;
