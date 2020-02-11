import { BatchTypeUrlEnum, BatchTypeNameEnum } from './trello.enum';
import { ClassField } from '@angular/compiler';

export class CurrentMemberModel {
  id: string;
  avatarUrl: string;
  email: string;
  fullName: string;
  url: string;
  username: string;
  bio: string;
  token?: string;
  avatarHash: string;
}

export class BoardListModel {
  id: string;
  name: string;
}

export class BoardModel {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  pinned: boolean;
  url: string;
  shortUrl: string;
}

export class ListListModel {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
}

const x = {
  t: ListListModel
};

/**
 *
 * BATCH ITEMS MODEL
 *
 */
export class BatchListModel {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;

  constructor(init?: Partial<BatchListModel>) {
    Object.assign(this, init);
  }
}

export class BatchCardModel {
  id: string;
  name: string;

  constructor(init?: Partial<BatchCardModel>) {
    Object.assign(this, init);
  }
}

export class BatchMemberCardLabelModel {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

export class BatchMemberCardModel {
  id: string;
  name: string;
  idList: string;
  idBoard: string;
  labels: Array<BatchMemberCardLabelModel>;
  url: string;
  idMembers: Array<string>;
  desc: string;
  descData: string;
  due: string;
  dueComplete: boolean;
  subscribed: boolean;
  boardName?: string;
  actions?: Array<BatchCardActions>;
  members?: Array<BatchMembers>;

  constructor(init?: Partial<BatchMemberCardModel>) {
    Object.assign(this, init);
  }
}

export class BatchCardActions {
  data: { text: string };
  date: string;
  id: string;
  type: string;
  memberCreator: { id: string; fullName: string };

  constructor(init?: Partial<BatchCardActions>) {
    Object.assign(this, init);
  }
}

export class BatchMembers {
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  id: string;
  initials: string;
  username: string;
  gravatarHash: string;
  email: string;
  uploadedAvatarHash: string;
  uploadedAvatarUrl: string;
  url: string;

  constructor(init?: Partial<BatchMembers>) {
    Object.assign(this, init);
  }
}

export type responseModelType = BatchListModel
| BatchCardModel
| BatchMemberCardLabelModel
| BatchMemberCardModel
| BatchCardActions
| BatchMembers;

export class BatchModel {
  url: BatchTypeUrlEnum;
  params: Array<string>;
  responseModel: BatchTypeNameEnum;

  constructor(
    url?: BatchTypeUrlEnum,
    params?: Array<string>,
    responseModel?: BatchTypeNameEnum
  ) {
    if (url) {
      this.url = url;
    }
    if (params) {
      this.params = params;
    }
    if (responseModel) {
      this.responseModel = responseModel;
    }
  }
}

export const Store: any = {
  BatchListModel,
  BatchCardModel,
  BatchMemberCardModel,
  BatchCardActions,
  BatchMembers
};
