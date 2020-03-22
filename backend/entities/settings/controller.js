const Settings = require('./model');

/**
 * get the admin settings (from admin model)
 * @return {Promise}
 */
const getSettings = () => {
  return new Promise((resolve, reject) => {
    Settings.findOne({})
    .exec((error, settings) => {
      if (error) { console.log(error); reject(error);}
      else if (!settings) {
        // AdminSettings doesn't yet exist in the db, create it
        const newSettings = new Settings({
          board_name: 'OpenCrisisBoard',
          board_logo_URL: ''
        });
        newSettings.save((error) => {
          if (error) { console.log(error); reject(error); }
        });
        resolve(Object.assign({}, newSettings));
      }
      else {
        resolve(Object.assign({}, {
          boardName: settings.board_name,
          boardLogoImage: settings.board_logo_URL
        }));
      }
    })
  });
};

/**
 * update the board name in the Admin model
 * @param  {String} new_board_name
 * @return {Promise}
 */
const updateBoardName = (new_board_name) => {
  return new Promise((reject, resolve) => {
    Settings.findOneAndUpdate({},
    {
      board_name: new_board_name
    })
    .exec((error, settings) => {
      if (error) { reject(error); }
      else {
        resolve(Object.assign({}, settings));
      }
    });
  });
};


/**
 * update the board logo image URL in the Admin model
 * @param  {String} new_board_logo_URL
 * @return {Promise}
 */
const updateBoardLogo = (new_board_logo_URL) => {
  return new Promise((reject, resolve) => {
    Settings.findOneAndUpdate({},
    {
      board_logo_URL: new_board_logo_URL
    })
    .exec((error, settings) => {
      if (error) { reject(error); }
      else {
        resolve(Object.assign({}, settings));
      }
    });
  });
};

module.exports = {
  getSettings,
  updateBoardName,
  updateBoardLogo
};