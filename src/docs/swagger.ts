export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Vehicle Rental Management System API",
    version: "1.0.0",
    description: "API documentation for the Vehicle Rental Management System",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths:
 {
    // ✅ Auth
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstname: { type: "string" },
                  lastname: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                  contact_phone: { type: "string" },
                  address: { type: "string" }
                },
                required: ["firstname", "lastname", "email", "password", "contact_phone", "address"],
              },
            },
          },
        },
        responses: {
          201: { description: "User registered" },
          400: { description: "Bad Request" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Unauthorized" },
        },
      },
    },

    // ✅ Bookings
    "/api/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Create a booking (admin and user)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_id: { type: "integer" },
                  vehicle_id: { type: "integer" },
                  location_id: { type: "integer" },
                  booking_date: { type: "string", format: "date" },
                  return_date: { type: "string", format: "date" },
                  total_amount: { type: "number", format: "float" },
                },
                required: [
                  "user_id",
                  "vehicle_id",
                  "location_id",
                  "booking_date",
                  "return_date",
                  "total_amount",
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "Booking created" },
          401: { description: "Unauthorized" },
        },
      },
      get: {
        tags: ["Bookings"],
        summary: "Get all bookings (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "List of bookings" },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/api/bookings/{id}": {
      get: {
        tags: ["Bookings"],
        summary: "Get a booking by ID (Admin or User)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Booking found" },
          401: { description: "Unauthorized" },
          404: { description: "Booking not found" },
        },
      },
      put: {
        tags: ["Bookings"],
        summary: "Update a booking (Admin or User)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  booking_date: { type: "string", format: "date" },
                  return_date: { type: "string", format: "date" },
                  total_amount: { type: "number" },
                  booking_status: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Booking updated" },
          401: { description: "Unauthorized" },
          404: { description: "Booking not found" },
        },
      },
      delete: {
        tags: ["Bookings"],
        summary: "Delete a booking (Admin or User)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Booking deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Booking not found" },
        },
      },
    },

    // ✅ Locations
    "/api/locations": {
      post: {
        tags: ["Locations"],
        summary: "Create a new location",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string" },
                  contact_phone: { type: "string" },
                },
                required: ["name", "address", "contact_phone"],
              },
            },
          },
        },
        responses: {
          201: { description: "Location created successfully" },
          400: { description: "Bad request" },
        },
      },
      get: {
        tags: ["Locations"],
        summary: "Get all locations",
        responses: {
          200: { description: "List of locations" },
          500: { description: "Internal server error" },
        },
      },
    },

    "/api/locations/{id}": {
      get: {
        tags: ["Locations"],
        summary: "Get a location by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Location found" },
          404: { description: "Location not found" },
        },
      },
      put: {
        tags: ["Locations"],
        summary: "Update a location by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string" },
                  contact_phone: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Location updated" },
          404: { description: "Location not found" },
        },
      },
      delete: {
        tags: ["Locations"],
        summary: "Delete a location by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Location deleted" },
          404: { description: "Location not found" },
        },
      },
    },

    "/api/vehicles": {
      post: {
        tags: ["Vehicles"],
        summary: "Create a new vehicle",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  make: { type: "string" },
                  model: { type: "string" },
                  year: { type: "integer" },
                  registration_number: { type: "string" },
                },
                required: ["make", "model", "year", "registration_number"],
              },
            },
          },
        },
        responses: {
          201: { description: "Vehicle created" },
          400: { description: "Bad request" },
        },
      },
      get: {
        tags: ["Vehicles"],
        summary: "Get all vehicles",
        responses: {
          200: { description: "List of vehicles" },
        },
      },
    },

    "/api/vehicles/{id}": {
      get: {
        tags: ["Vehicles"],
        summary: "Get a vehicle by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Vehicle found" },
          404: { description: "Vehicle not found" },
        },
      },
      put: {
        tags: ["Vehicles"],
        summary: "Update a vehicle",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  make: { type: "string" },
                  model: { type: "string" },
                  year: { type: "integer" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Vehicle updated" },
        },
      },
      delete: {
        tags: ["Vehicles"],
        summary: "Delete a vehicle",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Vehicle deleted" },
        },
      },
    },

    //  Vehicle Specifications
    "/api/vehicle-specifications": {
      post: {
        tags: ["Vehicle Specifications"],
        summary: "Create vehicle specifications",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vehicle_id: { type: "integer" },
                  color: { type: "string" },
                  fuel_type: { type: "string" },
                  transmission: { type: "string" },
                },
                required: ["vehicle_id", "color", "fuel_type", "transmission"],
              },
            },
          },
        },
        responses: {
          201: { description: "Specification created" },
        },
      },
      get: {
        tags: ["Vehicle Specifications"],
        summary: "Get all vehicle specifications",
        responses: {
          200: { description: "List of specs" },
        },
      },
    },
    "/api/vehicle-specifications/{id}": {
      get: {
        tags: ["Vehicle Specifications"],
        summary: "Get specs by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Specification found" },
        },
      },
      put: {
        tags: ["Vehicle Specifications"],
        summary: "Update specs",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  color: { type: "string" },
                  fuel_type: { type: "string" },
                  transmission: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Specification updated" },
        },
      },
      delete: {
        tags: ["Vehicle Specifications"],
        summary: "Delete specs",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Specification deleted" },
        },
      },
    },

    "/api/support-tickets": {
  post: {
    tags: ["Support Tickets"],
    summary: "Create a new support ticket",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "integer" },
              subject: { type: "string" },
              message: { type: "string" },
              status: { type: "string", example: "Open" }
            },
            required: ["user_id", "subject", "message"]
          }
        }
      }
    },
    responses: {
      201: { description: "Ticket created" },
      400: { description: "Invalid input" }
    }
  },
  get: {
    tags: ["Support Tickets"],
    summary: "Get all support tickets (Admin only)",
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: "List of tickets" },
      401: { description: "Unauthorized" }
    }
  }
},

"/api/support-tickets/{id}": {
  get: {
    tags: ["Support Tickets"],
    summary: "Get a support ticket by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      200: { description: "Ticket found" },
      404: { description: "Ticket not found" }
    }
  },
  put: {
    tags: ["Support Tickets"],
    summary: "Update ticket status or reply (Admin only)",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "Closed" },
              reply: { type: "string" }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Ticket updated" },
      404: { description: "Ticket not found" }
    }
  },
  delete: {
    tags: ["Support Tickets"],
    summary: "Delete a support ticket (Admin only)",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      200: { description: "Ticket deleted" },
      404: { description: "Ticket not found" }
    }
  }
},

"/api/users": {
  get: {
    tags: ["Users"],
    summary: "Get all users (Admin only)",
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: "List of users" },
      401: { description: "Unauthorized" }
    }
  }
},

"/api/users/{id}": {
  get: {
    tags: ["Users"],
    summary: "Get user by ID (Admin or the user)",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      200: { description: "User found" },
      401: { description: "Unauthorized" },
      404: { description: "User not found" }
    }
  },
  put: {
    tags: ["Users"],
    summary: "Update user details (Admin or the user)",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstname: { type: "string" },
              lastname: { type: "string" },
              contact_phone: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "User updated" },
      400: { description: "Validation error" },
      404: { description: "User not found" }
    }
  },
  delete: {
    tags: ["Users"],
    summary: "Delete a user (Admin only)",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      200: { description: "User deleted" },
      404: { description: "User not found" }
    }
  }
},


"/api/payments": {
  post: {
    tags: ["Payments"],
    summary: "Save a new payment",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              booking_id: { type: "integer" },
              amount: { type: "number", format: "float" },
              payment_status: { type: "string" },
              payment_date: { type: "string", format: "date-time" },
              payment_method: { type: "string" },
              transaction_id: { type: "string" }
            },
            required: [
              "booking_id",
              "amount",
              "payment_date",
              "payment_method",
              "transaction_id"
            ]
          }
        }
      }
    },
    responses: {
      201: { description: "Payment saved successfully" },
      400: { description: "Validation error" }
    }
  },
  get: {
    tags: ["Payments"],
    summary: "Get all payments",
    responses: {
      200: { description: "List of payments" },
      500: { description: "Internal server error" }
    }
  }
},

"/api/payments/{id}": {
  get: {
    tags: ["Payments"],
    summary: "Get a payment by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    responses: {
      200: { description: "Payment found" },
      404: { description: "Payment not found" }
    }
  },
  put: {
    tags: ["Payments"],
    summary: "Update payment status",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" }
            },
            required: ["status"]
          }
        }
      }
    },
    responses: {
      200: { description: "Payment status updated" },
      400: { description: "Invalid request" },
      404: { description: "Payment not found" }
    }
  }
},

"/api/payments/checkout": {
  post: {
    tags: ["Payments"],
    summary: "Create a Stripe checkout session",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", format: "email" },
              amount: { type: "number", format: "float" }
            },
            required: ["email", "amount"]
          }
        }
      }
    },
    responses: {
      200: { description: "Stripe session URL returned" },
      400: { description: "Validation error" },
      500: { description: "Stripe error" }
    }
  }
}

  },
};



