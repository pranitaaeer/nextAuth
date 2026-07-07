import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function auth(request:NextRequest) {
   try{
    const token = request.cookies.get('token')?.value || ''
    const decodedToken= jwt.verify(token, process.env.JWT_SECRET as string) as {id:string}
   return decodedToken.id
   
   }catch(err:any){
     console.log("err in auth middleware:",err)
     return NextResponse.json({error:"unauthorized"}, {status:401})
   }
}