import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-movie-form', function (hooks) {
  setupRenderingTest(hooks);

  test('title label has correct text', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert.dom('.form-label-title').hasText('Title');
  });

  test('description label has correct text', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert.dom('.form-label-description').hasText('Description');
  });
});
