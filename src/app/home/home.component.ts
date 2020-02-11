import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../shared/trello/trello.service';
import { take } from 'rxjs/operators';
import {
  BatchModel,
  BatchListModel,
  BatchMemberCardModel,
  BoardListModel,
  BatchCardActions,
  BatchMembers,
  Store
} from '../shared/trello/trello.model';
import { BatchTypeUrlEnum, BatchTypeNameEnum } from '../shared/trello/trello.enum';
import { ListHomeModel } from './home';
import { TextFilterPipe } from '../shared/pipes/text-filter.pipe';
import { LayoutService } from '../shared/layout/layout.service';
import { LoadingService } from '../shared/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../shared/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public boards: Array<BoardListModel>;
  public lists: Array<ListHomeModel>;
  public filter = {
    drawer: true,
    lists: [],
    boards: [],
    boardSearch: '',
    listSearch: ''
  };

  constructor(
    public trelloService: TrelloService,
    private textFilterPipe: TextFilterPipe,
    public layoutService: LayoutService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.translateService
      .get('getting-trello-info')
      .pipe(take(1))
      .subscribe(translate => {
        this.loadingService.show(translate);
        this.trelloService
          .getMemberBoards()
          .pipe(take(1))
          .subscribe(
            boards => {
              this.boards = boards;
              this.filter.boards = this.boards.map(board => ({
                name: board.name,
                checked: true
              }));

              // this.processHomeItems(this.chunkArray(batchMock, boards.length), boards);

              const lists = [];
              const cards = [];
              boards
                .map(board => board.id)
                .forEach(boardId =>
                  lists.push(
                    new BatchModel(
                      BatchTypeUrlEnum.BatchListModel,
                      [boardId],
                      BatchTypeNameEnum.BatchListModel
                    )
                  )
                );

              cards.push(
                new BatchModel(
                  BatchTypeUrlEnum.BatchMemberCardModel,
                  [this.trelloService.currentMemberValue.id],
                  BatchTypeNameEnum.BatchMemberCardModel
                )
              );
              this.trelloService
                .batch(lists.concat(cards))
                .pipe(take(1))
                .subscribe(
                  responses => {
                    this.processHomeItems(
                      this.chunkArray(responses, boards.length),
                      boards
                    );
                  },
                  error => {
                    console.log(error);
                    this.loadingService.hide();
                  }
                );
            },
            error => {
              console.log(error);
              this.loadingService.hide();
            }
          );
      });
  }

  listSelection(event) {
    this.filter.lists.find(l => l.name === event.option.value).checked =
      event.option.selected;
    this.saveFilter();
  }

  boardSelection(event) {
    this.filter.boards.find(b => b.name === event.option.value).checked =
      event.option.selected;
    this.saveFilter();
  }

  saveFilter() {
    const { lists, boards } = this.filter;
    this.storageService.save('individual-trello-filter', { lists, boards });
  }

  removeAccentsAndUpperCases(word) {
    word = word.toLowerCase();
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return word;
  }

  processHomeItems(items, boards) {
    this.lists = new Array<ListHomeModel>();
    items[0].forEach(lists =>
      lists.forEach(list => {
        const listFound = this.lists.find(
          l =>
            this.removeAccentsAndUpperCases(l.name) ===
            this.removeAccentsAndUpperCases(list.name)
        );
        if (listFound) {
          listFound.ids.push(list.id);
        } else {
          this.lists.push(new ListHomeModel(list.name, [list.id]));
        }
      })
    );

    items[1].forEach(cards =>
      cards.forEach(card => {
        const board = boards.find(b => b.id === card.idBoard);
        const list = this.lists.find(l => l.ids.find(id => id === card.idList));
        card.boardName = board ? board.name : '';
        list.cards.push(card);
      })
    );

    this.lists.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    this.lists.map(list =>
      list.cards.sort((a, b) =>
        a.boardName < b.boardName ? -1 : a.boardName > b.boardName ? 1 : 0
      )
    );
    this.filter.lists = this.lists.map(list => ({
      name: list.name,
      checked: true
    }));

    this.getCardsInfos();
  }

  getCardsInfos() {
    const batchActions = [];
    const members = [];
    const cards = [];
    this.lists.forEach(list =>
      list.cards.forEach(card => {
        batchActions.push(
          new BatchModel(
            BatchTypeUrlEnum.BatchCardActions,
            [card.id],
            BatchTypeNameEnum.BatchCardActions
          )
        );

        card.idMembers.forEach(idMember => {
          if (!members.find(m => m === idMember)) {
            members.push(idMember);
          }
        });
        card.actions = new Array<BatchCardActions>();
        card.members = new Array<BatchMembers>();
        cards.push(card);
      })
    );
    const batchMembers = members.map(
      idMember =>
        new BatchModel(BatchTypeUrlEnum.BatchMembers, [idMember], BatchTypeNameEnum.BatchMembers)
    );
    this.trelloService
      .batch(batchActions.concat(batchMembers))
      .pipe(take(1))
      .subscribe(
        response => {
          cards.forEach((card, index) => {
            card.actions = response[index];
            card.idMembers.forEach(
              idMember =>
                (card.members = card.members.concat(
                  response.filter((r: BatchMembers) => r.fullName && r.id === idMember)
                ))
            );
          });
          this.loadingService.hide();
          this.loadFilter();
        },
        error => {
          console.log(error);
          this.loadingService.hide();
        }
      );
  }

  loadFilter() {
    const filter = this.storageService.load('individual-trello-filter');
    if (filter) {
      this.filter.boards.forEach(board => {
        const found = filter.boards.find(b => b.name === board.name);
        if (found) {
          board.checked = found.checked;
        }
      });
      this.filter.lists.forEach(list => {
        const found = filter.lists.find(l => l.name === list.name);
        if (found) {
          list.checked = found.checked;
        }
      });
    }
  }

  chunkArray(array: Array<any>, chunkSize: number) {
    return [].concat.apply(
      [],
      array.map((elem, i) =>
        i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
      )
    );
  }

  filterDeSelectAll(type: string, action: string) {
    this.textFilterPipe
      .transform(this.filter[type], {
        key: 'name',
        filterText: this.filter.boardSearch,
        mode: 'include'
      })
      .forEach(board => (board.checked = action === 'select'));
    this.saveFilter();
  }

  listChange(idList, card) {
    const oldList = this.lists.find(list =>
      list.ids.find(id => id === card.idList)
    );
    const newList = this.lists.find(list => list.ids.find(id => id === idList));
    card.idList = idList;
    newList.cards.push(card);
    oldList.cards = oldList.cards.filter(c => c.id !== card.id);
  }
}
