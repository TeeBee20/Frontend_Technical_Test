import Component from '@glimmer/component';
import podNames from 'ember-component-css/pod-names';

export default class MovieListItem extends Component {
  styleNamespace = podNames['movie-list/movie-list-item'];

  get movie() {
    // adds ref property on movie in order to access doc ref property for edit & delete feature
    const movieDataRef = this.args.movie.data();
    movieDataRef.ref = this.args.movie.ref;
    return movieDataRef;
  }
}
