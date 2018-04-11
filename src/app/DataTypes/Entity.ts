export interface Entity {
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
  {long: 'com.commend.iss.activity.ActionSet.json', short: 'Action Set'},
  {long: 'com.commend.iss.activity.ActivityCard.json', short: 'Activity Card'},
  {long: 'com.commend.activity.http.HttpAction.json', short: 'Http Action'},
  {long: 'com.commend.device.config.Led.json', short: 'Led Config'},
  {long: 'com.commend.device.Barcode.json', short: 'Barcode'},
  {long: 'com.commend.device.config.AnalogInput.json', short: 'Analog Input Config'},
  {long: 'com.commend.device.config.Input.json', short: 'Input Config'},
  {long: 'com.commend.device.config.KeyboardButton.json', short: 'KeyboardButton Config'},
  {long: 'com.commend.device.config.MultiStateInput.json', short: 'MultiStateInput Config'},
  {long: 'com.commend.device.config.Output.json', short: 'Output Config'},
  {long: 'com.commend.device.video.SnapshotAction.json', short: 'SnapshotAction'},
  {long: 'com.commend.iss.activity.Account.json', short: 'Account'},
  {long: 'com.commend.iss.activity.DelayedAction.json', short: 'DelayedAction'},
  {long: 'com.commend.iss.activity.ExecuteScript.json', short: 'ExecuteScript'},
  {long: 'com.commend.iss.activity.TimeDefinition.json', short: 'TimeDefinition'},
  {long: 'com.commend.iss.activity.UserActionSet.json', short: 'UserActionSet'},
  {long: 'com.commend.iss.codecs.CodecList.json', short: 'CodecList'},
  {long: 'com.commend.iss.device.audio.AudioConfiguration.json', short: 'AudioConfiguration'},
  {long: 'com.commend.iss.device.buttons.ButtonGroup.json', short: 'ButtonGroup'},
  {long: 'com.commend.iss.device.buttons.HardwareButton.json', short: 'HardwareButton'},
  {long: 'com.commend.iss.device.buttons.VirtualButton.json', short: 'VirtualButton'},
  {long: 'com.commend.iss.device.camera.CameraSettings.json', short: 'CameraSettings'},
  {long: 'com.commend.iss.device.DeviceSettings.json', short: 'DeviceSettings'},
  {long: 'com.commend.iss.device.hardware.output.SwitchOutput.json', short: 'SwitchOutput'},
  {long: 'com.commend.iss.device.hardware.secureconnector.TheftAlarm.json', short: 'TheftAlarm'},
  {long: 'com.commend.iss.device.keyboard.KeyboardSettings.json', short: 'KeyboardSettings'},
  {long: 'com.commend.iss.device.led.LedSetting.json', short: 'LedSetting'},
  {long: 'com.commend.iss.device.led.SetLed.json', short: 'SetLed'},
  {long: 'com.commend.iss.device.video.MotionSetting.json', short: 'MotionSetting'},
  {long: 'com.commend.iss.device.video.VideoConfiguration.json', short: 'VideoConfiguration'},
  {long: 'com.commend.iss.email.SendMail.json', short: 'SendMail'},
  {long: 'com.commend.iss.email.SmtpSettings.json', short: 'SmtpSettings'},
  {long: 'com.commend.iss.network.NetworkConfiguration.json', short: 'NetworkConfiguration'},
  {long: 'com.commend.iss.telephony.Call.json', short: 'Call'},
  {long: 'com.commend.iss.telephony.AnswerCall.json', short: 'AnswerCall'},
  {long: 'com.commend.iss.telephony.CancelCall.json', short: 'CancelCall'},
  {long: 'com.commend.iss.telephony.ParallelCall.json', short: 'ParallelCall'},
  {long: 'com.commend.iss.telephony.PlayAudioLocal.json', short: 'PlayAudioLocal'},
  {long: 'com.commend.iss.telephony.PlayAudioRemote.json', short: 'PlayAudioRemote'},
  {long: 'com.commend.iss.telephony.SendDtmf.json', short: 'SendDtmf'},
  {long: 'com.commend.iss.telephony.SwitchLocalAudio.json', short: 'SwitchLocalAudio'},
  {long: 'com.commend.iss.telephony.SwitchVideo.json', short: 'SwitchVideo'},
  {long: 'com.commend.iss.telephony.TelephonySettings.json', short: 'TelephonySettings'},
  {long: 'com.commend.platform.i18n.I18nSettings.json', short: 'I18nSettings'},
  {long: 'com.commend.platform.security.Permission.json', short: 'Permission'},
  {long: 'com.commend.platform.security.Role.json', short: 'Security Role'},
  {long: 'com.commend.platform.security.User.json', short: 'Security User'},
  {long: 'com.commend.platform.theft.Theft.json', short: 'Theft'}
];
