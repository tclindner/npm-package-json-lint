export const slash = (path: string): string => {
  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  return isExtendedLengthPath ? path : path.replaceAll('\\', '/');
};
