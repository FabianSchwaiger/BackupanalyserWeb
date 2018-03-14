export interface Entity {
  name: string;
  status: boolean;
}

export interface ReceivedEntities {
  name: string;
  status: boolean;
}

interface EntityDescription {
  short: string;
  long: string;
}

export const AllEntities: EntityDescription[] = [
  {long: 'com.commend.platform.mediastore.Media.json', short: 'Media Store'},
  {long: 'com.commend.platform.mediastore.mediaCategory.json', short: 'Media Category'},
  {long: 'das', short: 'Migration Script'},
  {long: 'das', short: 'Action Set'},
  {long: 'das', short: 'Activity Card'},
  {long: 'com.commend.activity.http.HttpAction.json', short: 'Http Action'},
  {long: 'com.commend.device.config.Led.json', short: 'Led Config'}
];
