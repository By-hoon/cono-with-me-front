import { Icon } from "@iconify/react";
import useControlRenderingByClick from "../../hooks/useControlRenderingByClick";

interface HelpProps {
  children: React.ReactNode;
}

const Help = ({ children }: HelpProps) => {
  const { show, ref, onClickTarget } = useControlRenderingByClick();

  return (
    <div className="help__container" ref={ref}>
      <Icon icon="material-symbols:help" onClick={onClickTarget} />
      {show ? <div className="help-message">{children}</div> : null}
    </div>
  );
};

export default Help;
