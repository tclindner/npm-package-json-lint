export const slash = (path: string): string => {
  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replaceAll('\\', '/');
};
