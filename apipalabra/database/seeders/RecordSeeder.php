<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Ejemplo de datos de prueba para la tabla records
          $records = [
            [
                'nombreJugador' => 'Juan Perez',
                'email' => 'Juan.Perez@email.com',
                'nivelJuego' => 'Difícil',
                'tiempo' => 120,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombreJugador' => 'María López',
                'email' => 'María.López@email.com',
                'nivelJuego' => 'Normal',
                'tiempo' => 180,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombreJugador' => 'Pedro García',
                'email' => 'Pedro.García@email.com',
                'nivelJuego' => 'Fácil',
                'tiempo' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insertar los datos en la tabla records
        DB::table('records')->insert($records);
        }
    
}
