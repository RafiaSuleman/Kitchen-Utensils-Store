const order = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },

    // ✅ ADD THIS (important)
    {
      name: "items",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productName",
              title: "Product Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },

    {
      name: "totalAmount",
      title: "Total",
      type: "number",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Pending", "Completed", "Cancelled"],
      },
    },
  ],
  
};

export default order;