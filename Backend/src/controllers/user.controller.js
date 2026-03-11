
const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User is not found",
      });
    }

    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

export { getCurrentUser };

