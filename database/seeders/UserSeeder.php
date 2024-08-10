<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $user =  User::firstOrCreate(['email' => 'admin@example.com'],[
            'otherNames' => 'Admin',
            'surName' => 'User',
            'phoneNumber' => '0000000000',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
        ]);
        $role = Role::query()->where('name', 'Admin')->first();
        $user->roles()->attach($role);
    }
}
