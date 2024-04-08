<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'description',
        'image',
        'author_id',
    ];

    /**
     * Get the user that authored the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * The categories that belong to the post.
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_post');
    }
}
