<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//Movies can display any number of these.
class Review extends Model
{
    use HasFactory;

    protected $fillable = ['movie_id', 'reviewerName', 'score', 'comment'];
}
