<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//When a movie is clicked, it will display reviews.
//When a review gets added to a movie, the average score should be calculated.
class Movie extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'averageScore'];


    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
