import mongoose from 'mongoose'

const schema = mongoose.Schema({
	productNo: Number,
	recallDate: String,
	recallAddress: String,
	recallReason: String,
	recallStatus: Number, //0:Distributor  1:Supplier 2:complete -1 reject
	lotNo: String
})

export default mongoose.model("recall", schema)