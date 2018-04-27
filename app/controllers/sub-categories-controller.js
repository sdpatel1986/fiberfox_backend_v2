var baseController = require('./baseController');
const sql = require('mssql');

var subCategories = {
  get: function (req, res) {
    var query = `select sc.*, c.Name as CategoryName from SubCategories sc inner join Categories c on sc.CategoryId=c.CategoryId`;
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  find: function (req, res) {
    var query = `select sc.*, c.Name as CategoryName from SubCategories sc inner join Categories c on sc.CategoryId=c.CategoryId sc.SubCategoryId=${req.params.id}`;
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  findByCatId: function (req, res) {
    var query = `select * from SubCategories where CategoryId=${req.params.id}`;
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  //POST API
  post: function (req, res) {
    var query =
      `INSERT INTO [dbo].[SubCategories]
           ([Name]
           ,[CategoryId]
           ,[Sortorder])
       VALUES
           ('${req.body.Name}'
           ,${req.body.CategoryId}
           ,${req.body.SortOrder})`;
           console.log(query);
    baseController.executeQuery(query)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  //PUT API
  put: function (req, res) {
    var id = req.params.id //will get id
    res.send('not implemented');
  },

  // DELETE API
  delete: function (req, res) {
    baseController.delete(req, res, 'SubCategories', 'SubCategoryId', req.params.id);
  }
};

module.exports = subCategories;
