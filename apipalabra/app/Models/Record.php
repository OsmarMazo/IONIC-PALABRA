<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;
    //permite el llamado de estos datos atravez de la web
    protected $fillable = [
        'id',
        'nombreJugador',
        'email',
        'nivelJuego',
        'tiempo',
    ];

}
