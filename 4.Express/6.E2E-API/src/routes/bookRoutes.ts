import express from 'express'
import { createBook } from '../controllers/booksController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, librarianGuard } from '../middlewares/auth/roleMiddleWare'
import { bookOwnerGuard } from '../middlewares/books/bookOwnerGuard'


const router = express.Router()

//public routes 
router.post("/", protect, librarianGuard, createBook)

// Public Routes - Attendees can view events
// router.get("/", getEvents);
// router.get("/:id", getEventById);


// Protected Routes - Only Organizers can manage their own events
router.post("/", protect, librarianGuard, createBook);
// router.put("/:id", protect, librarianGuard, bookOwnerGuard, updateEvent);
// router.delete("/:id", protect, librarianGuard, bookOwnerGuard, deleteEvent);
router.post("/admin", protect, adminGuard, createBook);
// router.put("/:id", protect, librarianGuard, bookOwnerGuard, updateEvent);
// router.delete("/:id", protect, librarianGuard, bookOwnerGuard, deleteEvent);

// Admin Routes - Admins can manage all events
// router.delete("/:id/admin", protect, adminGuard, deleteEvent);

export default router