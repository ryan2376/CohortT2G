import express from 'express'
import { Router, Request, Response} from 'express'
import { createBook } from '../controllers/booksController'

const router = express.Router()

router.post('/', createBook)

export default router