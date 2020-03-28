const _ = require('lodash');
const asyncEach = require('async/each');

// controllers
const getAllOpinions = require('../opinion/controller').getAllOpinions;

// models
const User = require('./model');
const Discussion = require('../discussion/model');
const Opinion = require('../opinion/model');

/**
 * get user doc by user id
 * @param  {ObjectId} user_id
 * @return {promise}
 */
const getUser = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: user_id }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else if (!user) reject(null);
      else resolve(user);
    });
  });
};

/**
 * sign in/up user via twitter provided info
 * this will signin the user if user existed
 * or will create a new user using git infos
 * @param  {Object} profile    profile information provided by twitter
 * @return {promise}          user doc
 */
const signInViaTwitter = (profile) => {
  return new Promise((resolve, reject) => {

    // find if user exist on db
    User.findOne({ 'profile.id' : profile.id, 'provider' : 'twitter' }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else {
        // get the email from emails array of gitProfile
        const email = profile.emails ? _.find(profile.emails).value : null;
        const avatar = profile.photos ? _.find(profile.photos).value : null;

        // user existed on db
        if (user) {
          // update the user with latest git profile info
          user.name = profile.displayName;
          user.email = email;
          user.provider = 'twitter';
          user.username = profile.username || profile.displayName;
          user.avatarUrl = avatar;
          user.profile.id = profile.displayName;
          user.profile.url = profile.profileUrl;

          // save the info and resolve the user doc
          user.save((error) => {
            if (error) { console.log(error); reject(error); }
            else { resolve(user); }
          });
        }

        // user doesn't exists on db
        else {
          // check if it is the first user (adam/eve) :-p
          // assign him/her as the admin
          User.count({}, (err, count) => {
            console.log('usercount: ' + count);

            let assignAdmin = false;
            if (count === 0) assignAdmin = true;

            // create a new user
            const newUser = new User({
              name: profile.displayName,
              role: assignAdmin ? 'admin' : 'user',
              email: email,
              provider: 'twitter',
              username: profile.username || profile.displayName,
              avatarUrl: avatar,
              profile: {
                id: profile.id,
                url: profile.profileUrl,
              },
            });

            // save the user and resolve the user doc
            newUser.save((error) => {
              if (error) { console.log(error); reject(error); }
              else { resolve(newUser); }
            });

          });
        }
      }
    });

  });
};

/**
 * sign in/up user via facebook provided info
 * this will signin the user if user existed
 * or will create a new user using git infos
 * @param  {Object} profile    profile information provided by facebook
 * @return {promise}          user doc
 */
const signInViaFacebook = (profile) => {
  return new Promise((resolve, reject) => {
    // find if user exist on db
    User.findOne({ 'profile.id' : profile.id, 'provider' : 'facebook' }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else {
        // get the email from emails array of gitProfile
        const email = profile.emails ? _.find(profile.emails).value : null;
        const avatar = profile.photos ? _.find(profile.photos).value : null;

        // user existed on db
        if (user) {
          // update the user with latest git profile info
          user.name = profile.displayName;
          user.email = email;
          user.provider = 'facebook';
          user.username = profile.username || profile.displayName;
          user.avatarUrl = avatar;
          user.profile.id = profile.displayName;
          user.profile.url = profile.profileUrl;

          // save the info and resolve the user doc
          user.save((error) => {
            if (error) { console.log(error); reject(error); }
            else { resolve(user); }
          });
        }

        // user doesn't exists on db
        else {
          // check if it is the first user (adam/eve) :-p
          // assign him/her as the admin
          User.count({}, (err, count) => {
            console.log('usercount: ' + count);

            let assignAdmin = false;
            if (count === 0) assignAdmin = true;

            // create a new user
            const newUser = new User({
              name: profile.displayName,
              role: assignAdmin ? 'admin' : 'user',
              email: email,
              provider: 'facebook',
              username: profile.username || profile.displayName,
              avatarUrl: avatar,
              profile: {
                id: profile.id,
                url: profile.profileUrl,
              },
            });

            // save the user and resolve the user doc
            newUser.save((error) => {
              if (error) { console.log(error); reject(error); }
              else { resolve(newUser); }
            });

          });
        }
      }
    });

  });
};


/**190
 * sign in/up user via github provided info
 * this will signin the user if user existed
 * or will create a new user using git infos
 * @param  {Object} gitProfile    profile information provided by github
 * @return {promise}              user doc
 */
const signInViaGithub = (gitProfile) => {
  return new Promise((resolve, reject) => {

    // find if user exist on db
    User.findOne({ username: gitProfile.username, provider : 'github' }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else {
        // get the email from emails array of gitProfile
        const email = gitProfile.emails ? (_.find(gitProfile.emails, { verified: true }) || {}).value : null;

        // user existed on db
        if (user) {
          // update the user with latest git profile info
          user.name = gitProfile.displayName;
          user.provider = 'github';
          user.username = gitProfile.username;
          user.avatarUrl = gitProfile._json.avatar_url;
          user.email = email;
          user.profile.id = gitProfile._json.id,
          user.profile.url = gitProfile._json.html_url,
          user.profile.company = gitProfile._json.company,
          user.profile.location = gitProfile._json.location,
          user.profile.hireable = gitProfile._json.hireable,
          user.profile.bio = gitProfile._json.bio,
          user.profile.followers = gitProfile._json.followers,
          user.profile.following = gitProfile._json.following,

          // save the info and resolve the user doc
          user.save((error) => {
            if (error) { console.log(error); reject(error); }
            else { resolve(user); }
          });
        }

        // user doesn't exists on db
        else {
          // check if it is the first user (adam/eve) :-p
          // assign him/her as the admin
          User.count({}, (err, count) => {
            console.log('usercount: ' + count);

            let assignAdmin = false;
            if (count === 0) assignAdmin = true;

            // create a new user
            const newUser = new User({
              name: gitProfile.displayName,
              username: gitProfile.username,
              avatarUrl: gitProfile._json.avatar_url,
              email: email,
              role: assignAdmin ? 'admin' : 'user',
              provider: 'github',
              profile: {
                id: gitProfile._json.id,
                url: gitProfile._json.html_url,
                company: gitProfile._json.company,
                location: gitProfile._json.location,
                hireable: gitProfile._json.hireable,
                bio: gitProfile._json.bio,
                followers: gitProfile._json.followers,
                following: gitProfile._json.following,
              },
            });

            // save the user and resolve the user doc
            newUser.save((error) => {
              if (error) { console.log(error); reject(error); }
              else { resolve(newUser); }
            });

          });
        }
      }
    });

  });
};


/**190
 * sign in/up user via github provided info
 * this will signin the user if user existed
 * or will create a new user using git infos
 * @param  {Object} gitProfile    profile information provided by github
 * @return {promise}              user doc
 */
const signInViaPhone = (name, number, code) => {
  return new Promise((resolve, reject) => {
    // find user
    User.findOne({ 'profile.number' : number, 'provider' : 'phone' }, (error, user) => {
      // create user if not user
      if (user) {
        // update the user with latest git profile info
        user.name = name;
        user.provider = 'phone';
        user.username = name;
        user.profile.number = number;

        // check code
        if (code !== user.profile.code) {
          // @todo reject
          reject(new Error('Code does not match profile'));
        }

        // save the info and resolve the user doc
        user.save((error) => {
          if (error) { console.log(error); reject(error); }
          else { resolve(user); }
        });
      } else {

        // create a new user
        const newUser = new User({
          name: name,
          username: name,
          provider: 'phone',
          profile: {
            code: '', // @todo
            number: number,
          },
        });

        // save the user and resolve the user doc
        newUser.save((error) => {
          if (error) { console.log(error); reject(error); }
          else { resolve(newUser); }
        });
      }
    });
  });
}

/**
 * get the full profile of a user
 * @param  {String} username
 * @return {Promise}
 */
const getFullProfile = (username) => {
  return new Promise((resolve, reject) => {
    User
    .findOne({ username })
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) reject('not_found');
      else {
        // we got the user, now we need all discussions by the user
        Discussion
        .find({ user_id: result._id })
        .populate('forum')
        .lean()
        .exec((error, discussions) => {
          if (error) { console.log(error); reject(error); }
          else {
            // we got the discussions by the user
            // we need to add opinion count to each discussion
            asyncEach(discussions, (eachDiscussion, callback) => {
              getAllOpinions(eachDiscussion._id).then(
                (opinions) => {
                  // add opinion count to discussion doc
                  eachDiscussion.opinion_count = opinions ? opinions.length : 0;
                  callback();
                },
                (error) => { console.error(error); callback(error); }
              );
            }, (error) => {
              if (error) { console.log(error); reject(error); }
              else {
                result.discussions = discussions;
                resolve(result);
              }
            });
          }
        });
      }
    });
  });
};

module.exports = {
  getUser,
  getFullProfile,
  signInViaGithub,
  signInViaTwitter,
  signInViaFacebook,
};
