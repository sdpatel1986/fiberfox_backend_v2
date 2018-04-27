var baseController = require('./baseController');
const sql = require('mssql');

var userCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'Users');
  },

  find: function (req, res) {
    var query = `select * from Users where UserId=${req.params.id}`;
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  post: function (req, res) {
    var query =
      `INSERT INTO [dbo].[Users] 
                ([Email]
                ,[Username]
                ,[Password]
                ,[IndustryFieldId]
                ,[ActivityFieldId]
                ,[ActivityField]
                ,[ExperienceLevelId]
                ,[IsApproved])
            VALUES
                ('${req.body.Email}'
                ,'${req.body.Username}'
                ,'${req.body.Password}'
                ,${req.body.IndustryFieldId}
                ,${req.body.ActivityFieldId}
                ,'${req.body.ActivityField}'
                ,${req.body.ExperienceLevelId}
                ,0)`; // not approved!

    baseController.executeQuery(query)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  put: function (req, res) {
    var id = req.params.id //will get id
    res.send('not implemented');
  },

  delete: function (req, res) {
    var id = req.params.id //will get id
    res.send('not implemented');
  },

  getUnApproved: function (req, res) {
    var query = "select * from Users where IsApproved=0";
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  changeApproveUser: function (req, res) {
    var query =
      `UPDATE [dbo].[Users] 
      SET IsApproved = ${req.body.IsApproved}
      WHERE UserId=${req.params.id}`;

    baseController.executeQuery(query)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },
};

module.exports = userCtrl;
