class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      return;
    }

    if (this.isCodeDuplicate(product.code)) {
      console.log("Producto ya existe ");
      return;
    }

    product.id = this.nextProductId++;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado ");
    }
  }

  isProductValid(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock !== undefined
    );
  }

  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

const product1 = {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "imagen1.jpg",
  code: "P123",
  stock: 20,
};

const product2 = {
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 20,
  thumbnail: "imagen2.jpg",
  code: "P456",
  stock: 15,
};

productManager.addProduct(product1);
productManager.addProduct(product2);

console.log(productManager.getProducts());

const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

const notFoundProduct = productManager.getProductById(10); // Esto mostrará  el producto no encontrado
