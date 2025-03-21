let roleSchema = require('../schemas/role');

module.exports = {
  GetAllRole: async (filter = {}) => {
    const condition = { isDeleted: { $ne: true }, ...filter };
    return await roleSchema.find(condition);
  },

  GetRoleById: async (id) => {
    return await roleSchema.findById(id);
  },

  GetRoleByName: async (name) => {
    return await roleSchema.findOne({
      name: name,
      isDeleted: { $ne: true }
    });
  },

  CreateRole: async (name) => {
    let newRole = new roleSchema({
      name: name
    });
    return await newRole.save();
  },

  UpdateRole: async (id, name) => {
    return await roleSchema.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );
  },

  DeleteRole: async (id) => {
    return await roleSchema.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }
};