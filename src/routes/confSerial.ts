import express, { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { confSerial } from "../entity/confSerial"

const confSerialRepository = AppDataSource.getRepository(confSerial)
const confSerialRouter = express.Router();

confSerialRouter.delete('/delete', async (req: Request, res: Response) => {
    const id = req.query.id
    let userToRemove = await confSerialRepository.findOneBy({ id:+id })
    if (!userToRemove) {
        res.status(204).json({ "message": "not exist" });

    }
    await confSerialRepository.remove(userToRemove)
    res.status(200).json({ "message": "ok" });
}
);

confSerialRouter.post('/add', async (req: Request, res: Response) => {
    const { serial, bed ,sign} = req.body;
    const user = Object.assign(new confSerial(), {
        serial,
        bed,
        sign
    })
    res.status(200).json(confSerialRepository.save(user));
});

confSerialRouter.post('/edit', async (req: Request, res: Response) => {
    const { id,serial, bed ,sign} = req.body;
    console.log('body',req.body)
    const user = Object.assign(new confSerial(), {
        id,
        serial,
        bed,
        sign
    })
    res.status(200).json(confSerialRepository.save(user));
});

confSerialRouter.get('/getOne', async (req: Request, res: Response) => {
    const id = req.query.id;
    const confSerial = await confSerialRepository.findOne({
        where: { id:+id }
    })
    if (!confSerial) {
        res.status(204).json({ "message": "cama no definida" });
    }
    res.status(200).json(confSerial);
});

confSerialRouter.get('/getAll', async (req: Request, res: Response) => {
    res.status(200).json(await confSerialRepository.find());
});

export {confSerialRouter};