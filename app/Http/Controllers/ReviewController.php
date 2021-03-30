<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        //Make sure score and name are in
        $validatedData = $request->validate([
            'reviewerName' => 'required', 'score' => 'required',
        ]);

        $task = Review::create([
            'reviewerName' => $validatedData['reviewerName'],
            'score' => $validatedData['score'],
            'comment' => $request->comment,
        ]);

        return $task->toJson();
    }
}
