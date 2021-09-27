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

  test('title input has correct placeholder', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert.dom('.form-title').hasAttribute('placeholder', 'Title..');
  });

  test('description input has correct placeholder', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert
      .dom('.form-description')
      .hasAttribute('placeholder', 'Description..');
  });

  test('rating header has correct text', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert.dom('h4').hasText('Rating');
  });

  test('rating input has correct placeholder', async function (assert) {
    await render(hbs`<AddMovieForm />`);

    assert.dom('.form-rating').hasAttribute('placeholder', 'Rating..');
  });
});

test('title, description and rating inputs are required', async function (assert) {
  await render(hbs`<AddMovieForm />`);

  assert.dom('input[type="text"]').isRequired();
});
