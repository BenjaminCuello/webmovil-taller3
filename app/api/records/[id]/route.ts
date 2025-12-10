import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/records/: id - Obtener un registro por ID
export async function GET(
  request: NextRequest,
  { params }:  { params: { id: string } }
) {
  try {
    const record = await prisma.record.findUnique({
      where: { id: params. id },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener el registro" },
      { status: 500 }
    );
  }
}

// PUT /api/records/:id - Actualizar un registro
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validacion basica
    const allowedFields = [
      "title", "owner", "category", "status", 
      "amount", "completion", "delta", "tags"
    ];
    
    const updateData:  Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No hay campos validos para actualizar" },
        { status: 400 }
      );
    }

    // Validar category si se proporciona
    const validCategories = ["finanzas", "operaciones", "marketing", "rrhh", "soporte"];
    if (updateData.category && !validCategories.includes(updateData.category as string)) {
      return NextResponse.json(
        { success: false, error: `Categoria invalida.  Debe ser:  ${validCategories.join(", ")}` },
        { status: 400 }
      );
    }

    // Validar status si se proporciona
    const validStatuses = ["activo", "pendiente", "resuelto"];
    if (updateData.status && !validStatuses.includes(updateData.status as string)) {
      return NextResponse.json(
        { success: false, error: `Status invalido. Debe ser: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const record = await prisma.record. update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: record });
  } catch (error:  unknown) {
    console.error("Error updating record:", error);
    
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error:  "Error al actualizar el registro" },
      { status: 500 }
    );
  }
}

// DELETE /api/records/:id - Eliminar un registro
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.record.delete({
      where: { id: params. id },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Registro eliminado correctamente" 
    });
  } catch (error: unknown) {
    console.error("Error deleting record:", error);
    
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Error al eliminar el registro" },
      { status: 500 }
    );
  }
}