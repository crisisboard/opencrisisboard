const getSettings = require('./controller').getSettings;
const updateBoardName = require('./controller').updateBoardName;
const updateBoardLogo = require('./controller').updateBoardLogo;

/**
 * settings apis
 * @param  {Object} app
 */
const settingsAPI = (app) => {
  // get admin settings
  app.get('/api/settings/all_settings', (req, res) => {
    if (req.user && req.user.role === 'admin') {
      getSettings().then(
        (data) => {
          res.send(data);
        },
        (error) => {
          res.send(error);
        }
      );
    } else res.send({error: 'You are not admin buddy 😛'});
  });

  // update board name
  app.put('/api/settings/name', (req, res) => {
    if (req.user && req.user.role === 'admin') {
      updateBoardName(req.body.new_board_name).then(
        (data) => { res.send(data); },
        (error) => { res.send(error); }
      );
    }
    else res.send({ error: 'You are not admin buddy 😛' });
  });

  // update board logo image
  app.put('/api/settings/logo', (req, res) => {
    if (req.user && req.user.role === 'admin') {
      updateBoardLogo(req.body.new_board_logo_URL).then(
        (data) => { res.send(data); },
        (error) => { res.send(error); }
      );
    }
    else res.send({ error: 'You are not admin buddy 😛' });
  });
};

module.exports = settingsAPI;