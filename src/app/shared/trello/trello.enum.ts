export enum BatchTypeUrlEnum {
    BatchListModel = '/boards/{0}/lists',
    BatchCardModel = '/boards/{0}/cards',
    BatchMemberCardModel = '/members/{0}/cards',
    BatchCardActions = '/cards/{0}/actions',//?filter=all',
    BatchMembers = '/members/{0}'
}

export enum BatchTypeNameEnum {
  BatchListModel = 'BatchListModel',
  BatchCardModel = 'BatchCardModel',
  BatchMemberCardModel = 'BatchMemberCardModel',
  BatchCardActions = 'BatchCardActions',
  BatchMembers = 'BatchMembers'
}
