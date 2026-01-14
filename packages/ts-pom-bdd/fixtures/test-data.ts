export const TestData = {
  // Valid demo user credentials
  validUser: {
    username: 'demo',
    password: 'Demo@2025!',
  },

  // Invalid credentials for testing
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
  },

  // New user for registration tests
  newUser: {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Test@2025!',
  },

  // Product names for testing (legacy - kept for backward compatibility)
  products: {
    smartphone: 'スマートフォン',
    laptop: 'ノートパソコン',
    tshirt: 'Tシャツ',
    jeans: 'ジーンズ',
    programmingBook: 'プログラミング入門書',
    coffeeMaker: 'コーヒーメーカー',
  },

  // Category names
  categories: {
    all: 'すべての商品',
    electronics: '電子機器',
    clothing: '衣類',
    books: '書籍',
    home: 'ホーム',
  },

  // Sort options
  sortOptions: {
    byName: '名前順',
    byPriceAsc: '価格（安い順）',
    byPriceDesc: '価格（高い順）',
  },
};

// Product data with prices for Fixtures-based testing
export const ProductData = {
  smartphone: {
    name: 'スマートフォン',
    price: 59800,
    category: '電子機器',
  },
  laptop: {
    name: 'ノートパソコン',
    price: 128000,
    category: '電子機器',
  },
  tshirt: {
    name: 'Tシャツ',
    price: 2980,
    category: '衣類',
  },
  jeans: {
    name: 'ジーンズ',
    price: 8800,
    category: '衣類',
  },
  programmingBook: {
    name: 'プログラミング入門書',
    price: 3200,
    category: '書籍',
  },
  coffeeMaker: {
    name: 'コーヒーメーカー',
    price: 12800,
    category: 'ホーム',
  },
} as const;
