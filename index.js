const fs = require ('fs');

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

  updateProduct(id, newData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...newData };
    } else {
      console.log("Product not found.");
    }
  }


  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      console.log("Product deleted successfully.");
    } else {
      console.log("Product not found.");
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

  saveToFile(filename) {
    const productsJSON = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(filename, productsJSON, 'utf8');
    console.log(`Data saved to ${filename}`);
  }


  loadFromFile(filename) {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      this.products = JSON.parse(data);
      console.log(`Data loaded from ${filename}`);
    } catch (error) {
      console.error("Error loading data:", error.message);
    }
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

productManager.updateProduct(1, { price: 15, stock: 25 });
console.log(productManager.getProducts());

productManager.deleteProduct(2);
console.log(productManager.getProducts());


productManager.saveToFile('products.json');
productManager.loadFromFile('products.json');
console.log(productManager.getProducts());

// const notFoundProduct = productManager.getProductById(10); // Esto mostrará  el producto no encontrado
