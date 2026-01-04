import { test, expect } from '@playwright/test';

/**
 * GraphQL API テストサンプル
 * Countries GraphQL API (https://countries.trevorblades.com/) を使用
 * - 無料の公開 GraphQL API
 * - 国・大陸・言語の情報を提供
 */

const GRAPHQL_ENDPOINT = 'https://countries.trevorblades.com/graphql';

// GraphQLリクエストを送信するヘルパー関数
async function graphqlRequest(
  request: any,
  query: string,
  variables?: Record<string, any>
) {
  return request.post(GRAPHQL_ENDPOINT, {
    data: {
      query,
      variables,
    },
  });
}

test.describe('GraphQL - 基本クエリ', () => {
  test('すべての国を取得する', async ({ request }) => {
    const query = `
      query {
        countries {
          code
          name
          capital
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.countries).toBeInstanceOf(Array);
    expect(data.countries.length).toBeGreaterThan(0);

    // 最初の国のデータ構造を検証
    const firstCountry = data.countries[0];
    expect(firstCountry).toHaveProperty('code');
    expect(firstCountry).toHaveProperty('name');
  });

  test('特定の国を取得する（日本）', async ({ request }) => {
    const query = `
      query GetCountry($code: ID!) {
        country(code: $code) {
          code
          name
          native
          capital
          currency
          languages {
            code
            name
          }
          continent {
            code
            name
          }
        }
      }
    `;

    const response = await graphqlRequest(request, query, { code: 'JP' });
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.country).toBeDefined();
    expect(data.country.code).toBe('JP');
    expect(data.country.name).toBe('Japan');
    expect(data.country.native).toBe('日本');
    expect(data.country.capital).toBe('Tokyo');

    // 言語情報の検証
    const japanese = data.country.languages.find(
      (lang: any) => lang.code === 'ja'
    );
    expect(japanese).toBeDefined();
    expect(japanese.name).toBe('Japanese');

    // 大陸情報の検証
    expect(data.country.continent.code).toBe('AS');
    expect(data.country.continent.name).toBe('Asia');
  });

  test('すべての大陸を取得する', async ({ request }) => {
    const query = `
      query {
        continents {
          code
          name
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.continents).toBeInstanceOf(Array);
    expect(data.continents.length).toBe(7); // 7大陸

    // 大陸名を検証
    const continentNames = data.continents.map((c: any) => c.name);
    expect(continentNames).toContain('Asia');
    expect(continentNames).toContain('Europe');
    expect(continentNames).toContain('Africa');
  });

  test('特定の大陸の国一覧を取得する', async ({ request }) => {
    const query = `
      query GetContinent($code: ID!) {
        continent(code: $code) {
          code
          name
          countries {
            code
            name
          }
        }
      }
    `;

    // アジアの国一覧
    const response = await graphqlRequest(request, query, { code: 'AS' });
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.continent.name).toBe('Asia');
    expect(data.continent.countries.length).toBeGreaterThan(0);

    // 日本がアジアに含まれていることを確認
    const japan = data.continent.countries.find((c: any) => c.code === 'JP');
    expect(japan).toBeDefined();
    expect(japan.name).toBe('Japan');
  });
});

test.describe('GraphQL - 変数とフィルタリング', () => {
  test('変数を使用したクエリ', async ({ request }) => {
    const query = `
      query GetCountryDetails($code: ID!) {
        country(code: $code) {
          name
          emoji
          emojiU
          phone
        }
      }
    `;

    // アメリカの情報を取得
    const response = await graphqlRequest(request, query, { code: 'US' });
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.country.name).toBe('United States');
    expect(data.country.emoji).toBeDefined();
    expect(data.country.phone).toBe('1');
  });

  test('複数の変数を使用したクエリ', async ({ request }) => {
    const query = `
      query GetMultipleCountries($code1: ID!, $code2: ID!) {
        japan: country(code: $code1) {
          name
          capital
        }
        usa: country(code: $code2) {
          name
          capital
        }
      }
    `;

    const response = await graphqlRequest(request, query, {
      code1: 'JP',
      code2: 'US',
    });
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.japan.name).toBe('Japan');
    expect(data.japan.capital).toBe('Tokyo');
    expect(data.usa.name).toBe('United States');
    expect(data.usa.capital).toBe('Washington D.C.');
  });

  test('フィルタを使用したクエリ', async ({ request }) => {
    const query = `
      query {
        countries(filter: { continent: { eq: "EU" } }) {
          code
          name
          continent {
            name
          }
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.countries.length).toBeGreaterThan(0);

    // すべての国がヨーロッパであることを確認
    for (const country of data.countries) {
      expect(country.continent.name).toBe('Europe');
    }
  });
});

test.describe('GraphQL - エラーハンドリング', () => {
  test('存在しない国コードはnullを返す', async ({ request }) => {
    const query = `
      query {
        country(code: "INVALID") {
          name
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.country).toBeNull();
  });

  test('不正なクエリはエラーを返す', async ({ request }) => {
    const query = `
      query {
        country(code: "JP") {
          invalidField
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    // GraphQLは構文エラーでも200を返すことがある
    const result = await response.json();
    expect(result.errors).toBeDefined();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('必須変数が欠落している場合エラーを返す', async ({ request }) => {
    const query = `
      query GetCountry($code: ID!) {
        country(code: $code) {
          name
        }
      }
    `;

    // 変数を渡さない
    const response = await graphqlRequest(request, query);
    const result = await response.json();
    expect(result.errors).toBeDefined();
  });
});

test.describe('GraphQL - 言語情報', () => {
  test('すべての言語を取得する', async ({ request }) => {
    const query = `
      query {
        languages {
          code
          name
          native
          rtl
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.languages).toBeInstanceOf(Array);
    expect(data.languages.length).toBeGreaterThan(0);

    // 日本語を検索
    const japanese = data.languages.find((l: any) => l.code === 'ja');
    expect(japanese).toBeDefined();
    expect(japanese.name).toBe('Japanese');
    expect(japanese.native).toBe('日本語');
    expect(japanese.rtl).toBe(false); // 右から左ではない
  });

  test('特定の言語を取得する', async ({ request }) => {
    const query = `
      query GetLanguage($code: ID!) {
        language(code: $code) {
          code
          name
          native
          rtl
        }
      }
    `;

    const response = await graphqlRequest(request, query, { code: 'ar' });
    expect(response.ok()).toBeTruthy();

    const { data } = await response.json();
    expect(data.language.name).toBe('Arabic');
    expect(data.language.rtl).toBe(true); // アラビア語は右から左
  });
});

test.describe('GraphQL - レスポンス検証', () => {
  test('レスポンスの構造を検証する', async ({ request }) => {
    const query = `
      query {
        country(code: "JP") {
          code
          name
          capital
          currency
          phone
          emoji
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    const { data } = await response.json();

    // オブジェクト構造の厳密な検証
    expect(data.country).toMatchObject({
      code: 'JP',
      name: 'Japan',
      capital: 'Tokyo',
      currency: 'JPY',
      phone: '81',
      emoji: expect.any(String),
    });
  });

  test('ネストされたデータの検証', async ({ request }) => {
    const query = `
      query {
        country(code: "JP") {
          states {
            code
            name
          }
        }
      }
    `;

    const response = await graphqlRequest(request, query);
    const { data } = await response.json();

    // 日本の都道府県データ
    expect(data.country.states).toBeInstanceOf(Array);
    // 都道府県データが存在する場合、構造を検証
    if (data.country.states.length > 0) {
      const firstState = data.country.states[0];
      expect(firstState).toHaveProperty('code');
      expect(firstState).toHaveProperty('name');
    }
  });
});
