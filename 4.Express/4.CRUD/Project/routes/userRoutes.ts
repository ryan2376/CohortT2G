import { Router, Request, Response} from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Welcome to the API!'
    })
})

export default router