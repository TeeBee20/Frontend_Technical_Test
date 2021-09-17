import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-rating', function (hooks) {
  setupRenderingTest(hooks);

  test('rating header has correct text', async function (assert) {
    await render(hbs`<AddRating />`);

    assert.dom('h4').hasText('Rating');
  });
});
