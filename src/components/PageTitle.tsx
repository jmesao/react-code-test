interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h2 className='text-2xl text-center text-offWhite font-bold my-8'>
      {title}
    </h2>
  );
};

export default PageTitle;
