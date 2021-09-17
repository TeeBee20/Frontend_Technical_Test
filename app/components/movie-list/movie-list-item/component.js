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

  get movie() {
    // adds ref property on movie in order to access doc ref property for edit & delete feature
    const movieDataRef = this.args.movie.data();
    movieDataRef.ref = this.args.movie.ref;
    return movieDataRef;
  }

  @action toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }

  @action async submitMovieEdit(event) {
    event.preventDefault();

    const { newTitle, newDescription, newRating } = this;

    // uses user input to update doc
    await updateDoc(this.args.movie.ref, {
      title: newTitle,
      description: newDescription,
      rating: newRating,
    });

    this.args.loadMovies();
  }

  @action async deleteMovie() {
    //deletes selected doc and invokes loadMovies method to update displayed list
    await deleteDoc(this.args.movie.ref);
    this.args.loadMovies();
  }
}
