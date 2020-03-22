const waterfall = require('async/waterfall');

// models
const Admin = require('../admin/model');
const Discussion = require('../discussion/model');
const Opinion = require('../opinion/model');
const Forum = require('../forum/model');
const User = require('../user/model');

/**
 * get the admin settings (from admin model)
 * @return {Promise}
 */
const getAdminSettings = () => {
  return new Promise((resolve, reject) => {
    Admin.findOne({})
    .exec((error, adminSettings) => {
      if (error) { console.log(error); reject(error);}
      else if (!adminSettings) {
        console.log('AdminSettings doesn\'t exist yet');
        // AdminSettings doesn't yet exist in the db, create it
        const newAdminSettings = new Admin({
          board_name: 'OpenCrisisBoard',
          board_logo_URL: '' // TODO: Fill this in with default logo URL
        });
        newAdminSettings.save((error) => {
          if (error) { console.log(error); reject(error); }
        });
        resolve(Object.assign({}, newAdminSettings));
      }
      else {
        resolve(Object.assign({}, {
          boardName: adminSettings.board_name,
          boardLogoImage: adminSettings.board_logo_URL
        }));
      }
    })
  });
};

/**
 * get the information for admin dashboard
 * @return {Promise}
 */
const getAdminDashInfo = () => {
  return new Promise((resolve, reject) => {
    waterfall([
      (callback) => {
        Discussion.count().exec((error, count) => {
          callback(null, { discussionCount: count });
        });
      },
      (lastResult, callback) => {
        Opinion.count().exec((error, count) => {
          callback(null, Object.assign(lastResult, { opinionCount: count }));
        });
      },
      (lastResult, callback) => {
        Forum.count().exec((error, count) => {
          callback(null, Object.assign(lastResult, { forumCount: count }));
        });
      },
      (lastResult, callback) => {
        User.count().exec((error, count) => {
          callback(null, Object.assign(lastResult, { userCount: count }));
        });
      },
      (lastResult, callback) => {
        Forum
        .find({})
        .sort({ date: -1 })
        .lean()
        .exec((error, forums) => {
          callback(null, Object.assign(lastResult, { forums }));
        });
      },
    ], (error, result) => {
      if (error) { console.log(error); reject(error); }
      else resolve(result);
    });
  });
};

/**
 * update the board name in the Admin model
 * @param  {String} new_board_name
 * @return {Promise}
 */
const updateAdminBoardName = (new_board_name) => {
  return new Promise((reject, resolve) => {
    Admin.findOneAndUpdate({},
    {
      board_name: new_board_name
    })
    .exec((error, adminSettings) => {
      if (error) { reject(error); }
      else {
        resolve(Object.assign({}, adminSettings));
      }
    });
  });
};


/**
 * update the board logo image URL in the Admin model
 * @param  {String} new_board_logo_URL
 * @return {Promise}
 */
const updateAdminBoardLogo = (new_board_logo_URL) => {
  return new Promise((reject, resolve) => {
    Admin.findOneAndUpdate({},
    {
      board_logo_URL: new_board_logo_URL
    })
    .exec((error, adminSettings) => {
      if (error) { reject(error); }
      else {
        resolve(Object.assign({}, adminSettings));
      }
    });
  });
};

/**
 * create a new forum
 * @param  {String} forum_name
 * @param  {String} forum_slug
 * @return {Promise}
 */
const createForum = ({ forum_name, forum_slug }) => {
  return new Promise((resolve, reject) => {
    // check if the forum exists
    Forum
    .findOne({ forum_slug })
    .exec((error, forum) => {
      if (error) { console.log(error); reject({ serverError: true }); }
      else if (forum) { reject({ alreadyExists: true }); }
      else {
        // forum does not exist, so create a new one
        const newForum = new Forum({
          forum_slug,
          forum_name,
        });

        newForum.save((error) => {
          if (error) { console.log(error); reject({ created: false }); }
          else { resolve(Object.assign({}, newForum, { created: true })); }
        });
      }
    });
  });
};

/**
 * delete an entire forum
 * @param  {String} forum_id
 * @return {Promise}
 */
const deleteForum = ({ forum_id }) => {
  return new Promise((resolve, reject) => {
    // first remove any discussion regarding the forum
    Discussion.remove({ forum_id }).exec((error) => {
      if (error) { console.log(error); reject({ deleted: false }); }
      else {
        // remove any opinion regarding the forum
        Opinion.remove({ forum_id }).exec((error) => {
          if (error) { console.log(error); reject({ deleted: false }); }
          else {
            // now we can remove the forum
            Forum.remove({ _id: forum_id }).exec((error) => {
              if (error) { console.log(error); reject({ deleted: false }); }
              else { resolve({ deleted: true }); }
            });
          }
        });
      }
    });
  });
};

/**
 * delete a user
 * @param  {String} user_id
 * @return {Promise}
 */
const deleteUser = ({ user_id }) => {
  return new Promise((resolve, reject) => {
    // first we need to remove any discussion the user created
    Discussion.remove({ user_id }).exec((error) => {
      if (error) { console.log(error); reject({ deleted: false }); }
      else {
        // now we need to remove any opinions that are created by the user
        Opinion.remove({ user_id }).exec((error) => {
          if (error) { console.log(error); reject({ deleted: false }); }
          else {
            // finally we can remove the user
            User.remove({ _id: user_id }).exec((error) => {
              if (error) { console.log(error); reject({ deleted: false }); }
              else { resolve({ deleted: true }); }
            });
          }
        });
      }
    });
  });
};

/**
 * delete a single discussion
 * @param  {String} discussion_id
 * @return {Promise}
 */
const deleteDiscussion = ({ discussion_id }) => {
  return new Promise((resolve, reject) => {
    // first we need to remove any opinion regarding the discussion
    Opinion.remove({ discussion_id }).exec((error) => {
      if (error) { console.log(error); reject({ deleted: false }); }
      else {
        // now we need to remove the discussion
        Discussion.remove({ _id: discussion_id }).exec((error) => {
          if (error) { console.log(error); reject({ deleted: false }); }
          else { resolve({ deleted: true }); }
        });
      }
    });
  });
};

module.exports = {
  getAdminSettings,
  getAdminDashInfo,
  updateAdminBoardName,
  updateAdminBoardLogo,
  createForum,
  deleteForum,
  deleteUser,
  deleteDiscussion,
};
