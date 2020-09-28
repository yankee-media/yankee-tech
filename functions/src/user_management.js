const { db } = require('../creds');
const { getDisplayDateTimeNow, getUnixDateTimeNow } = require('./util/date_time');
const {
  DB_COMMENTERS, AVATAR_URL, DISPLAY_NAME, CREATED_AT, UNIX_CREATED_AT } = require('./util/constants');


exports.handleNewUserCreation = async (snapshot, context) => {
  if (!snapshot.exists) {
    console.error('non-existent user processed by onNewUser');
    return null
  }

  const uid = snapshot.id;
  const newUser = snapshot.data();

  const now = getDisplayDateTimeNow();
  const unixNow = getUnixDateTimeNow();

  try {
    await db.collection(DB_COMMENTERS).doc(uid).set({
      [AVATAR_URL]: newUser[AVATAR_URL],
      [DISPLAY_NAME]: newUser[DISPLAY_NAME],
      [CREATED_AT]: now,
      [UNIX_CREATED_AT]: unixNow
    });

    await snapshot.ref.update({
      [CREATED_AT]: now,
      [UNIX_CREATED_AT]: unixNow
    });

    console.log(`user ${uid} successfully added.`);
    return Promise.resolve('OK');

  } catch(error) {
    console.error(`user ${uid} add failed.`);
    console.error(error);
    return Promise.reject('FAILED');
  }
}

exports.handleUserUpdate = (snapshot, context) => {

  if (!snapshot.before.exists || !snapshot.after.exists) {
    console.error('non-existent user processed by onUserUpdate');
    return null
  }

  const uid = snapshot.after.id;
  const updatedUser = snapshot.after.data();

  return db.collection(DB_COMMENTERS).doc(uid).update({
    [AVATAR_URL]: updatedUser[AVATAR_URL],
    [DISPLAY_NAME]: updatedUser[DISPLAY_NAME]
  }).then(() => {
    console.log(`user ${uid} successfully updated.`);
    return Promise.resolve('OK');
  }).catch(error => {
    console.error(`user ${uid} update failed.`);
    console.error(error);
    return Promise.reject('FAILED');
  });
}