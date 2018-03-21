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
  {long: 'com.commend.platform.mediastore.MediaCategory.json', short: 'Media Category'},
  {long: 'com.commend.platform.db.MigrationScript.json', short: 'Migration Script'},
  {long: 'com.commend.iss.activity.Actionset.json', short: 'Action Set'},
  {long: 'com.commend.iss.activity.ActivityCard.json', short: 'Activity Card'},
  {long: 'com.commend.activity.http.HttpAction.json', short: 'Http Action'},
  {long: 'com.commend.device.config.Led.json', short: 'Led Config'}
];
