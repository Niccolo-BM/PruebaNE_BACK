const databaseManager = require('../../../config/database');
const Product = require('../models/Product');
const { NotFoundError } = require('../../../shared/errors/AppError');

class ProductRepository {
  constructor() {
    this.tableName = 'products';
  }

  async getConnection() {
    const connection = databaseManager.getMySQLConnection();
    if (!connection) {
      await databaseManager.connectMySQL();
    }
    return databaseManager.getMySQLConnection();
  }

  async findAll(options = {}) {
    const connection = await this.getConnection();
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const [products] = await connection.execute(
      `SELECT * FROM ${this.tableName} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM ${this.tableName}`
    );

    return {
      products: products.map(product => Product.fromDocument(product)),
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit),
      },
    };
  }

  async findById(id) {
    const connection = await this.getConnection();
    const [products] = await connection.execute(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    if (products.length === 0) {
      throw new NotFoundError('Product');
    }

    return Product.fromDocument(products[0]);
  }

  async create(productData) {
    const connection = await this.getConnection();
    const product = new Product(productData);
    const document = product.toDocument();

    const [result] = await connection.execute(
      `INSERT INTO ${this.tableName} (name, description, price, category, stock, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        document.name,
        document.description,
        document.price,
        document.category,
        document.stock,
        document.createdAt,
        document.updatedAt,
      ]
    );

    return Product.fromDocument({ ...document, id: result.insertId });
  }
}

module.exports = ProductRepository;
