export const formatToDateString = (
  releaseDate: string | undefined,
  language?: string,
): string => {
  if (!releaseDate) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const locale = language || navigator.language;

  return new Date(releaseDate).toLocaleDateString(locale, options);
};
