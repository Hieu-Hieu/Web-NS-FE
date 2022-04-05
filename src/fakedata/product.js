const product_01_image_01 = require('../images/product/pro1-1.jpg').default
const product_01_image_02 = require('../images/product/pro1-2.jpg').default

const product_02_image_01 = require('../images/product/pro2-1.jpeg').default
const product_02_image_02 = require('../images/product/pro2-2.jpg').default

const product_03_image_01 = require('../images/product/pro3-1.jpg').default
const product_03_image_02 = require('../images/product/pro3-2.jpg').default

const product_04_image_01 = require('../images/product/pro4-1.jpg').default
const product_04_image_02 = require('../images/product/pro4-2.jpg').default

const product_05_image_01 = require('../images/product/pro5-1.jpg').default
const product_05_image_02 = require('../images/product/pro5-2.jpeg').default

const product_06_image_01 = require('../images/product/pro6-1.jpeg').default
const product_06_image_02 = require('../images/product/pro6-2.jpg').default

const product_07_image_01 = require('../images/product/pro7-1.jpg').default
const product_07_image_02 = require('../images/product/pro7-2.jpg').default

const product_08_image_01 = require('../images/product/pro8-1.png').default
const product_08_image_02 = require('../images/product/pro8-2.jpg').default

const product_09_image_01 = require('../images/product/pro9-1.jpg').default
const product_09_image_02 = require('../images/product/pro9-2.jpg').default

const product_10_image_01 = require('../images/product/pro10-1.jpg').default
const product_10_image_02 = require('../images/product/pro10-2.jpg').default

const product_11_image_01 = require('../images/product/pro11-1.jpg').default
const product_11_image_02 = require('../images/product/pro11-2.jpg').default

const product_12_image_01 = require('../images/product/pro13-1.jpg').default
const product_12_image_02 = require('../images/product/pro13-2.jpg').default

const products = [
    {
        title: "product1",
        price: '189000',
        image01: product_01_image_01,
        image02: product_01_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "red", "traicay"],
        slug: "product01",
        certification: ["globalgap", "vietgap", "huuco", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product2",
        price: '159000',
        image01: product_02_image_01,
        image02: product_02_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "red", "raucu"],
        slug: "product02",
        certification: ["globalgap", "vietgap"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product3",
        price: '190000',
        image01: product_03_image_01,
        image02: product_03_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "red", "traicay", "ca"],
        slug: "product03",
        certification: ["vietgap"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product4",
        price: '194000',
        image01: product_04_image_01,
        image02: product_04_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "traicay", "raucu"],
        slug: "product04",
        certification: ["iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product5",
        price: '194000',
        image01: product_05_image_01,
        image02: product_05_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "thitheo"],
        slug: "product05",
        certification: ["iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product6",
        price: '194000',
        image01: product_06_image_01,
        image02: product_06_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitga"],
        slug: "product06",
        certification: ["globalgap", "vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product7",
        price: '194000',
        image01: product_07_image_01,
        image02: product_07_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["thitbo", "red", "traicay", "raucu"],
        slug: "product07",
        certification: ["huuco", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product8",
        price: '194000',
        image01: product_08_image_01,
        image02: product_08_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["thitbo", "red", "thitga"],
        slug: "product08",
        certification: ["globalgap", "vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product9",
        price: '194000',
        image01: product_09_image_01,
        image02: product_09_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["thitbo", "raucu"],
        slug: "product09",
        certification: ["vietgap"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product10",
        price: '194000',
        image01: product_10_image_01,
        image02: product_10_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["raucu", "thitga"],
        slug: "product10",
        certification: ["huuco"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product11",
        price: '194000',
        image01: product_11_image_01,
        image02: product_11_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["raucu", "thitga"],
        slug: "product11",
        certification: ["globalgap", "vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product12",
        price: '194000',
        image01: product_12_image_01,
        image02: product_12_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["raucu"],
        slug: "product12",
        certification: ["globalgap", "vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "prodcut13",
        price: '189000',
        image01: product_01_image_01,
        image02: product_01_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "red"],
        slug: "product13",
        certification: ["globalgap", "vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product14",
        price: '159000',
        image01: product_02_image_01,
        image02: product_02_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["thitbo", "raucu"],
        slug: "product14",
        certification: ["globalgap", "vietgap"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product15",
        price: '190000',
        image01: product_03_image_01,
        image02: product_03_image_02,
        categorySlug: "san-pham-tuoi-song",
        protype: ["red", "raucu"],
        slug: "product15",
        certification: ["iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product16",
        price: '194000',
        image01: product_08_image_01,
        image02: product_08_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["raucu", "thitga"],
        slug: "product16",
        certification: ["vietgap", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product17",
        price: '194000',
        image01: product_09_image_01,
        image02: product_09_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["thitbo", "raucu"],
        slug: "product17",
        certification: ["globalgap", "huuco", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    {
        title: "product18",
        price: '194000',
        image01: product_10_image_01,
        image02: product_10_image_02,
        categorySlug: "san-pham-da-che-bien",
        protype: ["raucu", "thitga"],
        slug: "product18",
        certification: ["globalgap", "vietgap", "huuco", "iso"],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
    },
    // 18 products
]

const getAllProducts = () => products

const getProducts = (count) => {
    const max = products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return products.slice(start, start + count)
}

const getProductBySlug = (slug) => products.find(e => e.slug === slug)

const getCartItemsInfo = (cartItems) => {
    let res = []
    if (cartItems.length > 0) {
        cartItems.forEach(e => {
            let product = getProductBySlug(e.slug)
            res.push({
                ...e,
                product: product
            })
        })
    }
    // console.log(res)
    // console.log('sorted')
    // console.log(res.sort((a, b) => a.slug > b.slug ? 1 : (a.slug < b.slug ? -1 : 0)))
    return res.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))
}

const productData = {
    getAllProducts,
    getProducts,
    getProductBySlug,
    getCartItemsInfo
}

export default productData