<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::where('title', true)
            ->orderBy('title', 'asc')
            ->withCount(['reviews'])
            ->get();

        return $movies->toJson();
    }


    //Add a yet to be rated movie to the database. The "average" score will but whatever this first rating is.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'averageScore' => 'required',
        ]);

        $movie = Movie::create([
            'name' => $validatedData['name'],
            'averageScore' => $validatedData['newScore'],
        ]);

        return response()->json('Movie added to review list!');
    }


    public function findOrCreateByName($title, $json = true)
    {

        //$movie = Movie::where('title', $title)->get();
        $movie = Movie::where('title', $title)
            ->with(['reviews'])->first();


        //Can't find it? Create a new movie with this name here.
        if (!$movie) {



            $movie = Movie::create([
                'title' => $title,
                'averageScore' => 0,
            ]);
        } else //Calculate average score when getting all reviews.
        {
            $movie = $this->calculateAverageScore($movie);
        }



        if ($json)
            return $movie->toJson();
        else
            return $movie;
    }

    private function calculateAverageScore($movie)
    {

        //Tally up all review scores
        $totalScore = 0;

        foreach ($movie->reviews as  $review) {
            $totalScore += $review->score;
        }

        //Calculate the average
        $aveScore = 0;

        if (count($movie->reviews) > 0)
            $aveScore = $totalScore / count($movie->reviews);

        //Update the average score, if not up to date
        if ($movie->averageScore != $aveScore) {
            $updatedMovie = Movie::where('title', $movie->title)
                ->update(['averageScore' => $aveScore]);

            return $updatedMovie;
        }

        //Return same movie if already up to date with average score.
        return $movie;
    }
}


/* To query stuff:
 => function ($query) {
                            $query->where('is_completed', false);
                          }]
*/