interface ErrorDataProps {
  isError: boolean;
  text: string;
}

const ErrorData = ({ isError, text }: ErrorDataProps) => {
  if (!isError) {
    return null;
  }

  return (
    <div className="text-center text-red-500 font-bold">
      <p>{text}</p>
    </div>
  );
};

export default ErrorData;
