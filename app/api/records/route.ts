import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/records - Listar registros con paginacion
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request. url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const status = searchParams. get("status");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Construir filtros
    const where:  Record<string, unknown> = {};
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { owner: { contains: search, mode: "insensitive" } },
      ];
    }

    const [records, total] = await Promise.all([
      prisma. record.findMany({
        where,
        skip,
        take: limit,
        orderBy:  { [sortBy]: sortOrder },
      }),
      prisma.record.count({ where }),
    ]);

    const formattedRecords = records.map((record) => ({
      id: record.id,
      title: record.title,
      owner: record.owner,
      category: record.category,
      status: record.status,
      amount: record.amount,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      metrics: {
        completion: record.completion,
        delta: record.delta,
      },
      tags: record.tags. join(" "),
    }));

    return NextResponse.json({
      success: true,
      data:  formattedRecords,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener los registros" },
      { status: 500 }
    );
  }
}

// POST /api/records - Crear un nuevo registro
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validacion de campos requeridos
    const requiredFields = ["title", "owner", "category", "status", "amount"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse. json(
        {
          success: false,
          error: `Campos requeridos faltantes: ${missingFields. join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validar category
    const validCategories = ["finanzas", "operaciones", "marketing", "rrhh", "soporte"];
    if (! validCategories.includes(body. category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Categoria invalida. Debe ser: ${validCategories.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validar status
    const validStatuses = ["activo", "pendiente", "resuelto"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Status invalido. Debe ser: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validar amount es numero
    if (typeof body.amount !== "number" || isNaN(body.amount)) {
      return NextResponse. json(
        { success: false, error: "El campo 'amount' debe ser un numero valido" },
        { status:  400 }
      );
    }

    const record = await prisma.record.create({
      data: {
        title:  body.title,
        owner: body.owner,
        category: body.category,
        status: body.status,
        amount: body.amount,
        completion: body.completion ??  0,
        delta: body.delta ?? 0,
        tags: body.tags ??  [],
      },
    });

    return NextResponse.json(
      { success: true, data: record },
      { status:  201 }
    );
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear el registro" },
      { status: 500 }
    );
  }
}