export function getLabelStatus(status: string) {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "DELIVERED":
      return "Entregue";
    case "ONROUTE":
      return "Em rota de entrega";
    case "RETURNED":
      return "Devolvido";
    case "CANCELED":
      return "Cancelado";
    default:
      return "Pendente";
  }
}
