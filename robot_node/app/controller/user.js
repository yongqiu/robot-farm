var express = require('express');
const r_role = require('../models').r_role;
const r_user = require('../models').r_user;
const ERROR = require('../../config/errorCode')

module.exports = {
  //roleData
  /**
   * 创建和更新角色
   * @param {*} req 
   * @param {*} res 
   */
  async postRoleInfo(req, res) {
    // console.log(req.body)
    var roleInfo = req.body.roleInfo;
    var roleName = req.body.roleName;
    var id = req.body.id;
    let date = Date.parse(new Date()) / 1000;
    if (!id) {
      let status = await r_role.create({
        roleInfo: roleInfo,
        roleName: roleName,
        createdAt: date
      }).catch(error => res.status(ERROR.BaseError).send(error));
      res.status(200).send({success: true, data: status})
    } else {
      let status = await r_role.findOne({
        where: {
          id: id
        }
      })
      if (status) {
        status.update({
          roleInfo: roleInfo,
          roleName: roleName,
          updatedAt: date
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({success: true, data: status})
      } else {
        return res.status(ERROR.NotFound).send({
          message: 'role Not Found',
        });
      }
      // res.status(200).send(status)
    }

  },
  /**
   * 获取角色列表
   * @param {*} req 
   * @param {*} res 
   */
  async getRoleList(req, res) {
    let roles = await r_role.findAll({
      where: {
        status: 0
      }
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).json({ data: roles })
  },
  /**
   * 删除角色
   * @param {*} req 
   * @param {*} res 
   */
  async deleteRole(req, res) {
    var id = req.query.id;
    let role = await r_role.findOne({
      where: {
        id: id
      }
    })
    if (!role) {
      return res.status(ERROR.NotFound).send({ success: false, message: 'role Not Found' });
    }
    role.update({
      status: 1
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).json({ success: true })
  },
  /**
   * 获取用户列表
   * @param {*} req 
   * @param {*} res 
   */
  async getUserList(req, res) {
    let roles = await r_user.findAll({
      where: {
        status: 0
      },
      include: [
        {
          model: r_role
        }
      ]
    })
    res.status(200).json({ success: true, data: roles })
  },
  async postUserInfo(req, res) {
    var roleId = req.body.roleId;
    var userName = req.body.userName;
    var password = req.body.password;
    var id = req.body.id;
    let date = Date.parse(new Date()) / 1000;
    if (!id) {
      let status = await r_user.create({
        role: roleId,
        userName: userName,
        password: password,
        createdAt: date
      }).catch(error => res.status(ERROR.BaseError).send(error));
      res.status(200).send({ success: true, data: status })
    } else {
      let status = await r_user.findOne({
        where: {
          id: id
        }
      })
      if (status) {
        status.update({
          role: roleId,
          userName: userName,
          password: password,
          updatedAt: date
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: status })
      } else {
        return res.status(ERROR.NotFound).send({
          message: 'role Not Found',
        });
      }
      // res.status(200).send(status)
    }
  },
  async deleteUser(req, res) {
    var id = req.query.id;
    let user = await r_user.findOne({
      where: {
        id: id
      }
    })
    if (!user) {
      return res.status(ERROR.NotFound).send({ success: false, message: 'user Not Found' });
    }
    user.update({
      status: 1
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).json({ success: true })
  },
  async getUserbyId(req, res) {
    var id = req.query.id;
    let user = await r_user.findOne({
      where: {
        id: id
      }
    })
    if (!user) {
      return res.status(ERROR.NotFound).send({ success: false, message: 'user Not Found' });
    }
    return res.status(200).json({ success: true, data: user })
  },
  async login(req, res) {
    let userName = req.body.userName;
    let password = req.body.password;
    let user = await r_user.findOne({
      where: {
        userName: userName,
        password: password
      }, 
      include: [
        {
          model: r_role
        }
      ]
    })
    if (!user) {
      return res.status(ERROR.NotFound).send({ success: false, message: 'user Not Found' });
    }
    return res.status(200).json({ success: true, data: user })
  }
};