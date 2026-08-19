import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";
import fs from "fs";
import path from "path";

// GET all products
export function GET() {
  return NextResponse.json({ products });
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      "nom", "nom_en", "brand", "category_label", "category_label_en",
      "description", "description_en", "prix", "type", "license_category",
      "autonomie_km", "vitesse_max", "stock", "poids_kg"
    ];
    
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newProduct: Product = {
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      slug: productData.slug || productData.nom.toLowerCase().replace(/\s+/g, "-"),
      ...productData,
      images: productData.images || [productData.image_url],
      battery_specs: productData.battery_specs || {
        capacity_kwh: 0,
        voltage: 0,
        removable: false,
        cell_type: "",
        charge_time_home_h: 0,
        warranty_years: 0,
        warranty_km: 0,
        ip_rating: ""
      },
      motor_specs: productData.motor_specs || {
        power_nominal_kw: 0,
        power_peak_kw: 0,
        power_hp: 0,
        torque_nm: 0,
        motor_type: "",
        transmission: "",
        regen_braking: false,
        riding_modes: []
      },
      available_options: productData.available_options || [],
      reviews: productData.reviews || [],
      rating: productData.rating || 0,
      review_count: productData.review_count || 0,
      certifications: productData.certifications || []
    };

    products.push(newProduct);
    
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    products[index] = { ...products[index], ...updateData };
    
    return NextResponse.json({ product: products[index] });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    products.splice(index, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}