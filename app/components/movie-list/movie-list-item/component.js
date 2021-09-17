import Component from '@glimmer/component';
import { action } from '@ember/object';
import { deleteDoc } from 'firebase/firestore';
import podNames from 'ember-component-css/pod-names';

export default class MovieListItem extends Component {
  styleNamespace = podNames['movie-list/movie-list-item'];

  get movie() {
    // adds ref property on movie in order to access doc ref property for edit & delete feature
    const movieDataRef = this.args.movie.data();
    movieDataRef.ref = this.args.movie.ref;
    return movieDataRef;
  }

  @action async deleteMovie() {
    //deletes selected doc and invokes loadMovies method to update displayed list
    await deleteDoc(this.args.movie.ref);
    this.args.loadMovies();
  }
}
