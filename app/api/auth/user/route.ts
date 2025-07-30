import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function getToken(req: NextRequest) {
  const authHeader = req.cookies.get("token")?.value;
  console.log(authHeader);
  return authHeader;
}

export async function getUserFromToken(req: NextRequest) {
  const token = getToken(req);
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const payload = await getUserFromToken(req);
  if (!payload)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await User.findByPk(payload.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const payload = await getUserFromToken(req);
  if (!payload)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { ...updateData } = await req.json();
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  const [updated] = await User.update(updateData, {
    where: { id: payload.id },
  });
  if (!updated)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  const user = await User.findByPk(payload.id, {
    attributes: { exclude: ["password"] },
  });
  return NextResponse.json({ user }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, company, phone } =
      await req.json();
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      company,
      phone,
    });

    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: user.get("id"),
          email: user.get("email"),
          role: user.get("role"),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
