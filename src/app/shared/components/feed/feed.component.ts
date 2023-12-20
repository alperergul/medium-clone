import {Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {feedActions} from "./store/actions";
import {selectError, selectFeedData, selectIsLoading} from "./store/reducers";
import {combineLatest} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FeedComponent implements OnInit{
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData)
  })
  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
  }

}
