<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles =[
            'Admin', 'Customer'
        ];

        foreach ($roles as $role){
            Role::firstOrCreate([
                'name' => $role
            ], [
                'id' => (string) Str::uuid(),
                'name' => $role
            ]);
        }
    }
}
