export function convertDateString(dateString: string): Date {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}T12:00:00`);
}
