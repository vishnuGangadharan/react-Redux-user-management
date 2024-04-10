import express from 'express';
import { signin } from '../../Controllers/admin/authControl.js';
import { deleteUser, searchUser, signout, userDetails, userUpdate, userselctedTobeEdited } from '../../Controllers/admin/adminControler.js';
const route = express()


route.post('/admin-signin',signin)
route.get('/userDetails',userDetails)
route.post('/userUpdate/:id',userUpdate)
route.get('/userDetails/:id',userselctedTobeEdited)
route.delete('/deleteUser/:id',deleteUser)
route.post('/search',searchUser)
route.get('/signout',signout)

export default route