import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BatchMemberCardModel, ListListModel, BatchCardActions } from 'src/app/shared/trello/trello.model';
import { TrelloService } from 'src/app/shared/trello/trello.service';
import { take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() card: BatchMemberCardModel;
  @Output() listChange = new EventEmitter();
  public cardDescEditable = false;
  public lists: Array<ListListModel>;
  public comment: string;

  constructor(
    private trelloService: TrelloService,
    public layoutService: LayoutService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.trelloService.getBoardLists(this.card.idBoard).pipe(take(1)).subscribe(
      response => this.lists = response.filter(r => r.id !== this.card.idList),
      error => {
        console.log(error);
      }
    );
  }

  openTrello(url) {
    window.open(url, '_blank');
  }

  watch() {
    this.trelloService.putCard(this.card.id, { subscribed: !this.card.subscribed }).pipe(take(1)).subscribe(
      response => {
        this.card.subscribed = response.subscribed;
      },
      error => {
        console.log(error);
      }
    );
  }

  copyTrello(url) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.translateService.get('link-copied').pipe(take(1)).subscribe(translate => this.snackbarService.open(translate));
  }

  changeDueDate(event) {
    this.trelloService.putCard(this.card.id, { due: event.value }).pipe(take(1)).subscribe(
      response => {
        this.card.due = response.due;
      },
      error => {
        console.log(error);
      }
    );
  }

  removeLabel(label) {
    this.trelloService.deleteCardLabel(this.card.id, label.id).pipe(take(1)).subscribe(
      response => {
        this.card.labels = this.card.labels.filter(l => l.id !== label.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeDesc() {
    this.translateService.get('updating-description').pipe(take(1)).subscribe(
      translate => {
        this.loadingService.show(translate);
        this.trelloService.putCard(this.card.id, { desc: this.card.desc }).pipe(take(1)).subscribe(
          response => {
            this.cardDescEditable = false;
            this.card.desc = response.desc;
            this.loadingService.hide();
          },
          error => {
            this.loadingService.hide();
            console.log(error);
          }
        );
      }
    );
  }

  changeList(idList) {
    this.translateService.get('updating-list').pipe(take(1)).subscribe(
      translate => {
        this.loadingService.show(translate);
        this.trelloService.putCard(this.card.id, { idList }).pipe(take(1)).subscribe(
          response => {
            this.listChange.emit(response.idList);
            this.loadingService.hide();
          },
          error => {
            console.log(error);
            this.loadingService.hide();
          }
        );
      }
    );
  }

  sendComment() {
    if (this.comment) {
      this.translateService.get('sending-comment').pipe(take(1)).subscribe(
        translate => {
          this.loadingService.show(translate);
          this.trelloService.postCardComment(this.card.id, this.comment).pipe(take(1)).subscribe(
            response => {
              this.card.actions.unshift(new BatchCardActions(response));
              this.comment = '';
              this.loadingService.hide();
            },
            error => {
              console.log(error);
              this.loadingService.hide();
            }
          );
        }
      );
    }
  }

}
