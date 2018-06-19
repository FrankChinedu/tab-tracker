const {
  History,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the songs'
      })
    }
  },

  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const histories = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'an error trying to create histories'
      })
    }
  }
}
