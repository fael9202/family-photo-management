export enum EmailEvent {
  confirmation = 'email.confirmation',
  passwordRecovery = 'email.passwordRecovery',
  emailNotification = 'email-notification',
  createAccount = 'email.createAccount',
  newAffiliate = 'email.newAffiliate',
  sendMed = 'email.sendMed',
}

export enum OnesignalEvent {
  loginUser = 'login.user',
}

export enum NotificationQueues {
  email = 'email-notification',
  oneSignal = 'onesignal-notification',
}

export enum WebhooksQueues {
  webhook = 'webhook',
}

export enum ReprocessWebhooksQueues {
  reprocessWebhook = 'reprocess-webhooks1',
}

export enum EmailNotificationProcess {
  confirmation = 'confirmation',
  passwordRecovery = 'passwordRecovery',
  createAccount = 'createAccount',
  newAffiliate = 'newAffiliate',
  sendMed = 'sendMed',
}

export enum WebhookEvent {
  cashin = 'webhook.cashin',
}

export enum AlbumsEvent {
  findAlbumsByUserId = 'albums.findAlbumsByUserId',
}

export enum PhotosEvent {
  findPhotosByAlbumId = 'photos.findPhotosByAlbumId',
}

export enum SlackEvent {
  postToSlack = 'slack.postToSlack',
}

export enum WebhooksJobs {
  sendWebhook = 'SendWebHook-queue',
  sendCashInWebhook = 'SendCashInWebHook-queue',
}

export enum ReprocessWebhooksJobs {
  reprocessWebhook = 'ReprocessWebhook-queue',
}

export enum RedisQueues {
  updateUserBalanceQueue = 'UpdateUserBalance-queue',
  userSecureBalanceQueue = 'UserSecureBalance-queue',
  userSecureBalanceTransactionHistoryQueue = 'UserSecureBalanceTransactionHistory-queue',
  cashoutQueue = 'cashout-queue',
}

export enum RedisJobs {
  updateUserBalanceJob = 'updateUserBalance-job',
  userSecureBalanceJob = 'userSecureBalance-job',
  userSecureBalanceTransactionHistoryJob = 'userSecureBalanceTransactionHistory-job',
  cashoutJob = 'cashout-job',
}
