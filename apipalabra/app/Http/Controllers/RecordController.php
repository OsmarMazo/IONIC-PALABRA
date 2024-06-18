<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //return response()->json(Record::all());   //data=retorna los datos de records
        return response()->json([
            'records' => Record::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       /* $records = new Record();
        $records->record =$request->records;
        $records->save();
        return response()->json($records);*/

        $records = Record::create($request->all());
        return response()->json([
            'records' => $records
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        //return response()->json(Record::find($id));
        return response()->json([
             Record::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request , $id )
    {
        //
        $records = Record::find($id);
        $records->Update($request->all());
        $records->save();
        return response()->json([
            'records' => $records
        ]);
        /*
        $records = Record::find($id);
        $records->record = $request->$records;
        $records->save();
        return response()->json($records);*/

        /*$records = Record::find($id);
        $records->nombreJugador = $request->input('nombreJugador');
        $records->email = $request->input('email');
        $records->nivelJuego = $request->input('nivelJuego');
        $records->tiempo = $request->input('tiempo');
        $records->save();
        return response()->json($records, 200);*/
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        try{
        $record = Record::findOrFail($id);
        $record->delete();
        return response()->json('borrado');
        }
        catch(\Exception $e){
            return response()->json([
                'error' => $e ->getMessage(),
                'status' =>500
        ]);
        }

    }
}
