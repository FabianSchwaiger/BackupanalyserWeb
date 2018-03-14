export interface Storage {
  MediaUsed: number;
  MediaMax: number;

  AudioUsed: number;
  AudioMax: number;
}

export interface ReceivedStorage {
  snapshots_usedSpace: number;
  snapshots_maxSpace: number;

  sounds_usedSpace: number;
  sounds_maxSpace: number;
}
