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
        $movie = $mc->findOrCreateByName($validatedData['movieName'], false);

        echo $movie;
        echo $movie['id'];

        //Post the review
        $review = Review::create([
            'movie_id' => $movie['id'],
            'reviewerName' => $validatedData['reviewerName'],
            'score' => $validatedData['score'],
            'comment' => $request->comment,
        ]);


        return $review->toJson();
    }
}
