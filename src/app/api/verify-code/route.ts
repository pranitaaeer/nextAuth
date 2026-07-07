import connectDB from "@/app/lib/db";
import UserModel from "@/app/models/user";


await connectDB();

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return Response.json({ error: 'Token is required' }, { status: 400 });
    }
    const user=await UserModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    
    await user.save();
    return Response.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) { 
    return Response.json({ error: 'Invalid request body' }, { status: 400 });   
  }
}