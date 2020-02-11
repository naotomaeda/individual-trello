import { BatchMemberCardModel, BatchMemberCardLabelModel } from '../shared/trello/trello.model';

export class ListHomeModel {
    name: string;
    ids: Array<string>;
    cards: Array<BatchMemberCardModel>;

    constructor(name: string = null, ids: Array<string> = [], cards: Array<BatchMemberCardModel> = []) {
        this.name = name;
        this.ids = ids;
        this.cards = cards;
    }
}
