interface LoadingProps {
  isLoading: boolean;
  text: string;
}

const Loading = ({ isLoading, text }: LoadingProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div>
      <p className='text-center text-offWhite font-bold'>{text}</p>
    </div>
  );
};

export default Loading;
