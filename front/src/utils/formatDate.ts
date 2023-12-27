export function formatDate(date: Date) {
  const format = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return format;
}
