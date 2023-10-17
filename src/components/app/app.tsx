import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import { AppRoute, AuthorizationStatus } from '../../const';
import SingInPage from '../../pages/sign-in/sign-in';
import MyListPage from '../../pages/my-list/my-list';
import FilmPage from '../../pages/film/film';
import AddReviewPage from '../../pages/add-review/add-review';
import PlayerPage from '../../pages/player/player';
import NotFoundPage from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { ShortFilm, WholeFilm } from '../../types/films';

type Props = {
  promoFilm: WholeFilm;
  films: ShortFilm[];
};

export default function App(props: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage {...props} />} />
        <Route path={AppRoute.Login} element={<SingInPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage films={props.films} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<FilmPage film={props.promoFilm} likeThis={props.films} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage film={props.promoFilm} />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage film={props.promoFilm} />}
        />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
