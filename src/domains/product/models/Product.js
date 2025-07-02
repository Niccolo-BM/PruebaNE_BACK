class Product {
  constructor({ id, name, description, price, category, stock, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static fromDocument(doc) {
    return new Product({
      id: doc._id || doc.id,
      name: doc.name,
      description: doc.description,
      price: doc.price,
      category: doc.category,
      stock: doc.stock,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDocument() {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateStock(quantity) {
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  isAvailable() {
    return this.stock > 0;
  }
}

module.exports = Product;
