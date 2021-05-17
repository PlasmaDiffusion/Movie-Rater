<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Review;
use App\Http\Controllers\MovieController;


class ReviewController extends Controller
{
    public function store(Request $request)
    {
        //Make sure score and name are in
        $validatedData = $request->validate([
            'reviewerName' => 'required', "movieName" => 'required', 'score' => 'required',
        ]);

        //Find a movie ID with the given name
        $mc = new MovieController();
        $movie = $mc->findOrCreateByName($validatedData['movieName']);



        //Post the review
        $task = Review::create([
            'reviewerName' => $validatedData['reviewerName'],
            'score' => $validatedData['score'],
            'comment' => $request->comment,
            'movie_id' => $movie->id,
        ]);

        return $task->toJson();
    }
}
