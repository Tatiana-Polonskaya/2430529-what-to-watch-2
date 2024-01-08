import { ChangeEventHandler, useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { postCommentAction } from '../../store/api-actions';
import { AppDispatch } from '../../types/state';
import { useNavigate } from 'react-router-dom';
import { RatingInput } from '../rating-input';
import { AppRoute } from '../../const';

type Props = {
  filmId: string;
};

const MIN_CHAR_LIMIT = 50;
const MAX_CHAR_LIMIT = 400;

function isCommentFormValid(text: string, score: number) {
  return (
    text.length >= MIN_CHAR_LIMIT && text.length <= MAX_CHAR_LIMIT && score > 0
  );
}

export function CommentForm({ filmId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const backToFilm = useCallback(
    () => navigate(AppRoute.Film.replace(':id', filmId)),
    [filmId, navigate]
  );

  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState(0);

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (userRating: number) => {
    setRating(userRating);
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(
        postCommentAction({
          id: filmId,
          comment: commentText,
          rating: Number(rating),
          backToFilm,
        })
      );
    },
    [backToFilm, commentText, dispatch, filmId, rating]
  );

  return (
    <form action="#" className="add-review__htmlForm" onSubmit={handleSubmit}>
      <RatingInput onChange={handleRatingChange} />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={commentText}
          onChange={handleTextareaChange}
          minLength={MIN_CHAR_LIMIT}
          maxLength={MAX_CHAR_LIMIT}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!isCommentFormValid(commentText, rating)}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
