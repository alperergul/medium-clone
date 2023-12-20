import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {FeedService} from "../services/feed.service";
import {feedActions} from "./actions";
import {catchError, map, of, switchMap} from "rxjs";
import {GetFeedResponseInterface} from "../types/getFeedResponse.interface";
import {authActions} from "../../../../auth/store/actions";

export const getFeedEffect = createEffect(
  (
    action$ = inject(Actions),
      feedService = inject(FeedService)
  ) =>{
    return action$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed})
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure())
          })
        )
      })
    )
  },
  {
    functional: true
  }
)
