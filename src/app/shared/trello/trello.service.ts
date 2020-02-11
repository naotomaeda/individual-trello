import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  CurrentMemberModel,
  BoardListModel,
  BoardModel,
  ListListModel,
  BatchModel,
  BatchListModel,
  BatchCardModel,
  BatchMemberCardModel,
  BatchCardActions
} from 'src/app/shared/trello/trello.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { BatchTypeUrlEnum } from './trello.enum';
import { Store } from './trello.model';
import { batchMock } from '../home-batch.mock';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {
  private currentMemberSubject: BehaviorSubject<CurrentMemberModel>;
  public currentMember: Observable<CurrentMemberModel>;
  public token: string;

  constructor(private http: HttpClient) {
    this.currentMemberSubject = new BehaviorSubject<CurrentMemberModel>(
      JSON.parse(localStorage.getItem('currentMember'))
    );
    this.currentMember = this.currentMemberSubject.asObservable();
  }

  public get currentMemberValue(): CurrentMemberModel {
    return this.currentMemberSubject.value;
  }

  public set currentMemberValue(currentMember) {
    this.currentMemberSubject.next(currentMember);
  }

  getMemberFromToken(token) {
    const fields = [
      'id',
      'avatarUrl',
      'email',
      'fullName',
      'url',
      'username',
      'bio'
    ];
    const url = `${
      environment.apiUrl
    }tokens/${token}/member?fields=${fields.join(',')}&key=${
      environment.apiKey
    }&token=${token}`;
    return this.http.get<CurrentMemberModel>(url);
  }

  updateMember() {
    const fields = [
      'id',
      'avatarHash',
      'email',
      'fullName',
      'url',
      'username',
      'bio'
    ];
    const url = `${environment.apiUrl}/members/${
      this.currentMemberValue.id
    }?fields=${fields.join(',')}&key=${environment.apiKey}&token=${
      this.currentMemberValue.token
    }`;
    this.http
      .get<CurrentMemberModel>(url)
      .pipe(take(1))
      .subscribe(
        currentMember => {
          currentMember.token = this.currentMemberValue.token;
          this.currentMemberSubject.next(currentMember);
          localStorage.setItem(
            'currentMember',
            JSON.stringify(this.currentMemberValue)
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  batch<T>(batchs: Array<BatchModel>) {
    const urls = [];
    batchs.forEach(batch => {
      let url = batch.url.toString();
      batch.params.forEach((param, index) => {
        url = url.replace(`{${index}}`, param);
      });
      urls.push(url);
    });
    return this.http
      .get<Array<T>>(
        `${environment.apiUrl}batch?urls=${urls.join(',')}&key=${
          environment.apiKey
        }&token=${this.currentMemberValue.token}`
      )
      .pipe(
        map(responses => {
          batchs.map((batch, index) => {
            if (responses[index][200].constructor === Array) {
              responses[index] = responses[index]['200'].map(obj => new Store[batch.responseModel](obj));
            } else {
              responses[index] = new Store[batch.responseModel](responses[index]['200']);
            }
          });
          return responses;
        })
      );
  }

  getMemberBoards() {
    const fields = ['id', 'name'];
    const url = `members/${this.currentMemberValue.id}/boards?key=${
      environment.apiKey
    }&token=${this.currentMemberValue.token}&fields=${fields.join(',')}`;
    return this.http.get<Array<BoardListModel>>(environment.apiUrl + url);

    return of<Array<BoardListModel>>([
      { name: 'Atem', id: '5e1f3aa1bade40295b18929b' },
      { name: 'Pedro', id: '5e1f3afa36997a7170ac6c38' },
      { name: 'SQUAD FRONT', id: '5de026427db1e1794c782156' }
    ]);
  }

  getBoard(boardId: string) {
    const fields = [
      'id',
      'name',
      'desc',
      'closed',
      'pinned',
      'url',
      'shortUrl'
    ];
    const url = `boards/${boardId}?key=${environment.apiKey}&token=${
      this.currentMemberValue.token
    }&fields=${fields.join(',')}`;
    return this.http.get<BoardModel>(environment.apiUrl + url);
  }

  getBoardLists(boardId: string) {
    const fields = ['id', 'name', 'closed', 'idBoard', 'pos', 'subscribed'];
    const url = `boards/${boardId}/lists?key=${environment.apiKey}&token=${
      this.currentMemberValue.token
    }&fields=${fields.join(',')}`;
    return this.http.get<Array<ListListModel>>(environment.apiUrl + url);
  }

  putCard(cardId: string, params) {
    const body = {
      key: environment.apiKey,
      token: this.currentMemberValue.token,
      ...params
    };
    return this.http.put<BatchMemberCardModel>(
      `${environment.apiUrl}cards/${cardId}`,
      body
    );
  }

  deleteCardLabel(cardId, labelId) {
    return this.http.delete(
      `${environment.apiUrl}cards/${cardId}/idLabels/${labelId}?key=${environment.apiKey}&token=${this.currentMemberValue.token}`
    );
  }

  postCardComment(cardId: string, text: string) {
    const body = {
      key: environment.apiKey,
      token: this.currentMemberValue.token,
      text
    };
    return this.http.post<BatchCardActions>(
      `${environment.apiUrl}cards/${cardId}/actions/comments`,
      body
    );
  }
}
