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

  @action async editMovie() {
    this.isEditing = true;
  }

  @action async deleteMovie() {
    //deletes selected doc and invokes loadMovies method to update displayed list
    await deleteDoc(this.args.movie.ref);
    this.args.loadMovies();
  }
}
