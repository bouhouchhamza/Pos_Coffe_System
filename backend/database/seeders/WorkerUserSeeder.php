<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class WorkerUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'worker@cafe.test'],
            [
                'name' => 'Worker',
                'password' => bcrypt('password'),
                'role' => 'worker',
            ]
        );
    }
}
