
//export {};
var express =require('express');

let diagnosesService =require('../services/diagnosesService');

var router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/', (_req:any, res:any) => {
  res.send(diagnosesService.getEntries());
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/', (_req:any, res:any) => {
  res.send('Saving a diary!');
})

module.exports=router;