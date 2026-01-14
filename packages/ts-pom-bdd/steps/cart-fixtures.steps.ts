import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

// カスタムfixturesを使用してBDDステップを作成
const { When, Then } = createBdd(test);

/**
 * カートに商品を追加（Fixtures使用版）
 * catalogPage fixtureを使用（Page Object自動生成）
 * authenticatedPage fixtureにより、このステップ実行時には既にログイン済み
 */
When('Fixturesで{string}をカートに追加する', async ({ catalogPage, authenticatedPage }, productName: string) => {
  await catalogPage.addToCart(productName);
  await authenticatedPage.waitForTimeout(300); // UI更新待ち
});

/**
 * カート内の商品数を検証（Fixtures使用版）
 * cartComponent fixtureを使用（new不要）
 */
Then('Fixturesでカートに商品が{int}件あることを確認する', async ({ cartComponent, authenticatedPage }, expectedCount: number) => {
  await authenticatedPage.waitForTimeout(300); // UI更新待ち
  const actualCount = await cartComponent.getItemCount();
  expect(actualCount).toBe(expectedCount);
});

/**
 * カート内に特定の商品が表示されることを確認（Fixtures使用版）
 * cartComponent fixtureを使用
 */
Then('Fixturesでカート内に{string}が表示されることを確認する', async ({ cartComponent }, productName: string) => {
  const itemNames = await cartComponent.getItemNames();
  expect(itemNames).toContain(productName);
});

/**
 * 商品の価格が正しいことを検証（Fixtures使用版）
 * cartComponent と productData fixtureを両方使用
 *
 * この步驟がFixturesの強みを最も示す部分：
 * - cartComponentで実際の価格を取得
 * - productDataで期待値を取得（テストデータ一元管理）
 * - 価格変更時はtest-data.tsを1箇所修正するだけ
 */
Then('Fixturesで{string}の価格が正しいことを確認する', async ({ cartComponent, productData }, productName: string) => {
  // ProductDataから期待価格を取得
  const productEntry = Object.values(productData).find(p => p.name === productName);

  if (!productEntry) {
    throw new Error(
      `商品 "${productName}" がProductDataに定義されていません。` +
      `test-data.tsのProductDataに追加してください。`
    );
  }

  const expectedPrice = productEntry.price;
  const actualPrice = await cartComponent.getItemPrice(productName);

  expect(actualPrice).toBe(expectedPrice);
});
