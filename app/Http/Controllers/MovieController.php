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

    /*public function findOrCreateByName($id)
    {
        $movie = Movie::with(['reviews'])->find($id);

        return $movie->toJson();
    }*/

    public function findOrCreateByName($title, $json = true)
    {
        echo $title;

        //$movie = Movie::where('title', $title)->get();
        $movie = Movie::where('title', $title)
            ->with(['reviews'])->first();

        echo " Movie gotten: ", $movie, " ";

        //Can't find it? Create a new movie with this name here.
        if (!$movie) {

            echo "Creating ", $movie;


            $movie = Movie::create([
                'title' => $title,
                'averageScore' => 0,
            ]);
        }



        if ($json)
            return $movie->toJson();
        else
            return $movie;
    }

    //public function addReview()


    /*public function findOrCreateByNameUserReviews($username)
    {
        $movies = Movie::with(['reviews' => function ($query) {
            $query->where('reviewerName', $username);
        }])->get();

        return $movies->toJson();
    }*/
}


/* To query stuff:
 => function ($query) {
                            $query->where('is_completed', false);
                          }]
*/