import express from 'express';
import { signin } from '../../Controllers/admin/authControl.js';
import { userDetails, userUpdate, userselctedTobeEdited } from '../../Controllers/admin/adminControler.js';
const route = express()


route.post('/admin-signin',signin)
route.get('/userDetails',userDetails)
route.post('/userUpdate/:id',userUpdate)
route.get('/userDetails/:id',userselctedTobeEdited)

export default route