interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <div className="title__container">{title}</div>;
};

export default Title;
