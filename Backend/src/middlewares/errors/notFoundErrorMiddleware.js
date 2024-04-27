export const notFoundErrorMiddleware = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  };