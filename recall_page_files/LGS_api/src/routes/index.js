import {
    Router
} from 'express';
import {
    catchAsync
} from '../middleware/error';

import Recall from '../models/recall'

const router = Router();


router.get('/', catchAsync(async (req, res) => {
    const recall = await Recall.find()
    res.send(recall)
}));

router.get('/:productNo', catchAsync(async (req, res) => {
    const productNo = req.params.productNo
    const recall = await Recall.find({ productNo })
    res.send(recall[0] || {})
}));


router.post('/', catchAsync(async (req, res) => {
    const r = await Recall.find({ productNo: 1 })
    if (r.length > 0) {
        res.send({ error: 'The product has already sent a recall notice' })
        return
    }
    const { recallReason, lotNo } = req.body
    const recallDate = `${new Date()}`
    const recallAddress = 'TEMPE,AZ,USA'
    const recall = new Recall({
        lotNo,
        recallReason,
        productNo: 1,
        recallDate,
        recallAddress,
        recallStatus: 0
    })
    await recall.save()
    res.send({
        'message': 'success'
    })
}));


router.post('/recall', catchAsync(async (req, res) => {
    const r = await Recall.find({ productNo: 1 })
    if (r.length > 0) {
        res.send({ error: 'The product has already sent a recall notice' })
        return
    }
    const { recallReason, lotNo } = req.body
    const recallDate = `${new Date()}`
    const recallAddress = 'TEMPE,AZ,USA'
    const recall = new Recall({
        lotNo,
        recallReason,
        productNo: 1,
        recallDate,
        recallAddress,
        recallStatus: 1
    })
    await recall.save()
    res.send({
        'message': 'success'
    })
}));


router.get('/recall/:id', catchAsync(async (req, res) => {
    const id = req.params.id
    console.log(id);
    await Recall.findOneAndUpdate({ productNo: id }, { recallStatus: 1 }).exec()
    res.send({
        'message': 'success'
    })
}));

router.get('/recallConfirm/:id', catchAsync(async (req, res) => {
    const id = req.params.id
    await Recall.findOneAndUpdate({ productNo: id }, { recallStatus: 2 }).exec()
    res.send({
        'message': 'success'
    })
}));

router.get('/recallRefuse/:id', catchAsync(async (req, res) => {
    const id = req.params.id
    await Recall.findOneAndUpdate({ productNo: id }, { recallStatus: -1 }).exec()
    res.send({
        'message': 'success'
    })
}));



export default router;
