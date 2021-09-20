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

  @action sortMoviesByRating(event) {
    this.sortOrder = event.target.value;
    this.loadMovies();
  }

  @action async loadMovies() {
    const db = getFirestore();
    const moviesRef = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesRef);
    const movies = [];

    if (this.sortOrder === 'asc') {
      //query that orders by rating asc
      const q = query(moviesRef, orderBy('rating'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        movies.push(doc);
      });
    } else if (this.sortOrder === 'desc') {
      //query that orders by rating desc
      const q = query(moviesRef, orderBy('rating', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        movies.push(doc);
      });
    } else {
      //default behavior that displays movies when no order chosen
      moviesSnapshot.forEach((doc) => movies.push(doc));
    }

    this.movies = movies;
  }

  constructor(owner, args) {
    super(owner, args);

    this.loadMovies();
  }
}
