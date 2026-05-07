<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::query()->pluck('id', 'name');

        $products = [
            [
                'category_id' => $categories['Cafes'] ?? null,
                'name' => 'Cafe Noir',
                'description' => 'Cafe espresso simple.',
                'purchase_price' => 3.50,
                'sale_price' => 8.00,
                'stock' => 100,
                'min_stock' => 15,
            ],
            [
                'category_id' => $categories['Cafes'] ?? null,
                'name' => 'Cafe Creme',
                'description' => 'Cafe au lait cremeux.',
                'purchase_price' => 4.50,
                'sale_price' => 10.00,
                'stock' => 80,
                'min_stock' => 12,
            ],
            [
                'category_id' => $categories['Boissons'] ?? null,
                'name' => 'Jus Orange',
                'description' => 'Jus orange frais.',
                'purchase_price' => 7.00,
                'sale_price' => 15.00,
                'stock' => 45,
                'min_stock' => 10,
            ],
            [
                'category_id' => $categories['Boissons'] ?? null,
                'name' => 'The',
                'description' => 'The marocain classique.',
                'purchase_price' => 2.50,
                'sale_price' => 7.00,
                'stock' => 90,
                'min_stock' => 15,
            ],
            [
                'category_id' => $categories['Sandwichs'] ?? null,
                'name' => 'Sandwich Poulet',
                'description' => 'Sandwich poulet avec crudites.',
                'purchase_price' => 12.00,
                'sale_price' => 25.00,
                'stock' => 30,
                'min_stock' => 8,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['name' => $product['name']],
                $product + [
                    'image' => null,
                    'is_active' => true,
                ]
            );
        }
    }
}
