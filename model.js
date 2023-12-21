const user = {
  id: 1,
  name: "John",
  address: {
    street: "Main St",
    number: 123,
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  password: "**********",
};

const order = {
  id: 1,
  userName: "John",
  items: [
    {
      name: "Product 1",
      price: 10.99,
      quantity: 2,
      total: 21.98,
    },
    {
      name: "Product 2",
      price: 5.99,
      quantity: 1,
      total: 5.99,
    },
  ],
  total: 27.97,
  status: "pending",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
  deliveryAddress: "123 Main St, Anytown, CA 12345",
};
