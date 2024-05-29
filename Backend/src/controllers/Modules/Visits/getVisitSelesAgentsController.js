import { getselesAgentsService } from "../../../services/Modules/visits/getselesAgentsService.js";

export const getVisitSaleAgetsController = async (req, res, next) => {
    try {
      const selesAgents = await getselesAgentsService();

      res.status(200).send({
        status: 'ok',
        data: selesAgents,
    });
    } catch (error) {
      next(error);
    }
  };
  