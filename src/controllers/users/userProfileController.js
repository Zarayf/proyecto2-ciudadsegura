import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const userProfileController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id);

    res.send({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default userProfileController;
