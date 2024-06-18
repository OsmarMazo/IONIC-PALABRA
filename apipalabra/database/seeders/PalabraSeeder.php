<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PalabraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $palabras = ['perro', 'gatos', 'casas', 'arbol', 'luces', 'cielo', 'mares', 'monte', 'valle', 'nieve'];

        foreach ($palabras as $palabra) {
            DB::table('palabras')->insert([
                'palabra' => $palabra,
            ]);

        }
    }

}
