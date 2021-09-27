import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import podNames from 'ember-component-css/pod-names';

export default class MovieListItem extends Component {
  styleNamespace = podNames['movie-list/movie-list-item'];

  @tracked isEditing = false;

  @tracked newTitle = this.movie.title;

  @tracked newDescription = this.movie.description;

  @tracked newRating = this.movie.rating;

  @tracked errorMessage;

  get movie() {
    const movieDataRef = this.args.movie.data();
    return movieDataRef;
  }

  @action toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }

  @action editMovieRating(event) {
    this.newRating = event.target.value;
  }

  @action async submitMovieEdit(event) {
    event.preventDefault();

    this.errorMessage = undefined;

    try {
      const { newTitle, newDescription, newRating } = this;

      // uses user input to update doc
      await updateDoc(this.args.movie.ref, {
        title: newTitle,
        description: newDescription,
        rating: newRating,
      });

      this.args.loadMovies();
    } catch (error) {
      this.errorMessage = error?.message;
    }
  }

  @action async deleteMovie() {
    this.errorMessage = undefined;

    try {
      //deletes selected doc and invokes loadMovies method to update displayed list
      await deleteDoc(this.args.movie.ref);
      this.args.loadMovies();
    } catch (error) {
      this.errorMessage = error?.message;
    }
  }
}
