// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.random(id)
  }

  static add = () => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static editById = (id, { data }) => {
    const product = this.getById(id)

    if (product) {
      this.edit(product, data)

      return true
    } else {
      return false
    }
  }

  static edit = (product, { name }) => {
    if (name) {
      product.name = name
    }
  }
}
//========================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })

  // ↑↑ сюди вводимо JSON дані
})

// ================================================================// Підключаємо роутер до бек-енду
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)
  console.log(Product.getList())

  res.render('alert', {
    style: 'alert',
    info: 'Товар створений',
  })
})
//=============================================================
router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Товар видалений',
  })
})
//=========================================================
router.post('/product-edit', function (req, res) {
  const { price, name, description } = req.body

  let result = false

  const product = Product.editById(Number(id))

  if (product.verifyName(name)) {
    Product.edit(price, { name })
    result = true
  }

  res.render('alert', {
    style: 'alert',
    info: result
      ? 'Зберегти оновлення'
      : 'Повернутися назад',
  })
})
//=========================================
// Підключаємо роутер до бек-енду
module.exports = router
