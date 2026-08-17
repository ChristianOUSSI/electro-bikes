import { Order } from "./types";

const orders: Order[] = [];

export function saveOrder(order: Order): Order {
  orders.push(order);
  return order;
}

export function getOrders(): Order[] {
  return orders;
}

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
