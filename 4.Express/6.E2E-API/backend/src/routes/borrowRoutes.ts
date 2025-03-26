import express from 'express'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, librarianGuard } from '../middlewares/auth/roleMiddleWare'
import { bookOwnerGuard } from '../middlewares/books/bookOwnerGuard'
import { createBorrow } from '../controllers/borrowController'




const router = express.Router()

// Route to create a new borrow record
router.post('/', protect, createBorrow);

export default router