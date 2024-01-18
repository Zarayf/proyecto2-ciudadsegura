import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const userProfileController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserByIdModel(userId);

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
