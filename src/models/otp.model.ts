import { Schema,model } from "mongoose";
import crypto from 'crypto'
import { OTP } from "../interfaces/otp.interface";

const otpSchema=new Schema<OTP>({
passwordResetToken:{
    type:String,
},
createdAt:{type:Date,default:Date.now(),index:{expires:60}}
},{timestamps:true})



otpSchema.methods.generateToken=function(){
const resetToken= crypto.randomBytes(32).toString("hex")
this.passwordResetToken= crypto.createHash("sha256").update(resetToken).digest("hex")
return resetToken

}



export default model<OTP>('Otp', otpSchema);