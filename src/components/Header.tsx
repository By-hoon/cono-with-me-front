import { Icon } from "@iconify/react";

interface DetailHeaderProps {
  title: string;
  closeFunction: () => void;
}

export const DetailHeader = ({ title, closeFunction }: DetailHeaderProps) => {
  return (
    <div className="flex">
      <div className="detail-title">{title}</div>
      <div className="cancel-icon__container" onClick={closeFunction}>
        <Icon icon="material-symbols:close" />
      </div>
    </div>
  );
};
