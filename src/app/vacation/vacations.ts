import Joi from 'joi'
import { handleMassage } from '../services/validation-service';


export interface Vacation {
  id?: string,
  destination?: string,
  price?: number,
  startDate?: Date,
  endDate?: Date,
  description?: string,
  imageUrl?: string
}
