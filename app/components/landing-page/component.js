import { action } from '@ember/object';
import {
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import podNames from 'ember-component-css/pod-names';

export default class LandingPage extends Component {
  styleNamespace = podNames['landing-page'];

  @tracked movies;

  @tracked sortOrder;

  @tracked isLoading = true;

  @action sortMoviesByRating(event) {
    this.sortOrder = event.target.value;
    this.loadMovies();
  }

  @action async loadMovies() {
    const db = getFirestore();
    const moviesRef = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesRef);
    const movies = [];

    //if sort order has been chosen, conditional logic carries out correct orderBy query
    if (this.sortOrder) {
      let q;

      if (this.sortOrder === 'asc') {
        q = query(moviesRef, orderBy('rating'));
      } else {
        q = query(moviesRef, orderBy('rating', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        movies.push(doc);
      });
    } else {
      //default behavior if no sort order chosen
      moviesSnapshot.forEach((doc) => movies.push(doc));
    }

    this.movies = movies;
    this.isLoading = false;
  }

  constructor(owner, args) {
    super(owner, args);

    this.loadMovies();
  }
}
