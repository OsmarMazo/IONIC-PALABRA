<?php

namespace App\Http\Controllers;

use App\Models\Palabra;
use Illuminate\Http\Request;

class palabraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return  response()->json(Palabra::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $palabra = new Palabra();
        $palabra->palabra = $request->palabra;
        $palabra->save();
        return response()->json($palabra);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        return response()->json(Palabra::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Palabra $palabra, $id)
    {
        //
        $palabra = Palabra::find($id);
        //$palabra->palabra = $request->palabra;
        $palabra->save();   
        return response()->json($palabra);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $palabra = Palabra::find($id);
        $palabra->delete();
        return response()->json('borrado');
    }
}
